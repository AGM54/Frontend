import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Term {
  id: number;
  term: string;
  definition: string;
  color: string;
}

const terms: Term[] = [
  {
    id: 1,
    term: "Tarifa",
    definition: "precio que pagas por la electricidad",
    color: '#FF6B6B'
  },
  {
    id: 2,
    term: "Servicio regulado",
    definition: "electricidad con precio y calidad supervisados que se brinda a los usuarios residenciales",
    color: '#4ECDC4'
  },
  {
    id: 3,
    term: "Norma técnica",
    definition: "regla que asegura el buen funcionamiento del sistema",
    color: '#45B7D1'
  },
  {
    id: 4,
    term: "Distribuidor",
    definition: "empresa que lleva la electricidad hasta tu hogar",
    color: '#96CEB4'
  },
  {
    id: 5,
    term: "Usuario residencial",
    definition: "persona que recibe y paga el servicio de energía",
    color: '#FFEAA7'
  }
];

interface GlossaryGameProps {
  onComplete: () => void;
}

export default function GlossaryGame({ onComplete }: GlossaryGameProps) {
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [shake] = useState(new Animated.Value(0));
  const [definitions, setDefinitions] = useState<Term[]>([]);
  const [droppedDefinitions, setDroppedDefinitions] = useState<{ [key: number]: Term | null }>({});
  const [currentDragging, setCurrentDragging] = useState<Term | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    // Mezclar las definiciones al inicio
    setDefinitions([...terms].sort(() => Math.random() - 0.5));
    // Inicializar espacios vacíos
    const initial: { [key: number]: Term | null } = {};
    terms.forEach(term => {
      initial[term.id] = null;
    });
    setDroppedDefinitions(initial);
  }, []);

  const handleTermPress = (term: Term) => {
    if (matchedPairs.includes(term.id)) return;
    setSelectedTerm(term);
  };

  const handleDefinitionPress = (definition: Term) => {
    if (matchedPairs.includes(definition.id)) return;
    setSelectedDefinition(definition);
  };

  useEffect(() => {
    if (selectedTerm && selectedDefinition) {
      if (selectedTerm.id === selectedDefinition.id) {
        // Correcto
        setMatchedPairs([...matchedPairs, selectedTerm.id]);
        setSelectedTerm(null);
        setSelectedDefinition(null);

        // Verificar si completó todos los pares
        if (matchedPairs.length + 1 === terms.length) {
          setTimeout(onComplete, 1000);
        }
      } else {
        // Incorrecto - animar shake
        Animated.sequence([
          Animated.timing(shake, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(shake, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true
          }),
          Animated.timing(shake, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          })
        ]).start(() => {
          setSelectedTerm(null);
          setSelectedDefinition(null);
        });
      }
    }
  }, [selectedTerm, selectedDefinition]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrastra la definición al espacio correcto</Text>

      {/* Definiciones disponibles arriba */}
      <View style={styles.definitionsContainer}>
        {definitions.map((def) => (
          <Animated.View
            key={def.id}
            style={[
              styles.definitionCard,
              { backgroundColor: def.color },
              !matchedPairs.includes(def.id) && {
                transform: [
                  { translateX: currentDragging?.id === def.id ? pan.x : 0 },
                  { translateY: currentDragging?.id === def.id ? pan.y : 0 }
                ]
              }
            ]}
          >
            <Text style={styles.definitionText}>{def.definition}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Términos con espacios vacíos */}
      <View style={styles.termsContainer}>
        {terms.map((term) => (
          <View key={term.id} style={styles.termRow}>
            <Text style={styles.termText}>{term.term}</Text>
            <View style={[
              styles.dropZone,
              droppedDefinitions[term.id] && { backgroundColor: term.color }
            ]}>
              {droppedDefinitions[term.id] && (
                <Text style={styles.droppedText}>
                  {droppedDefinitions[term.id]?.definition}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {matchedPairs.length} de {terms.length} pares encontrados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropZone: {
    width: width * 0.5,
    height: height * 0.08,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.02,
  },
  definitionCard: {
    padding: width * 0.03,
    borderRadius: 12,
    marginBottom: height * 0.01,
    opacity: 0.8,
  },
  droppedText: {
    color: '#000000',
    fontSize: width * 0.032,
    textAlign: 'center',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  termsContainer: {
    marginBottom: height * 0.02,
  },
  definitionsContainer: {
    marginBottom: height * 0.02,
  },
  termButton: {
    backgroundColor: '#1C1C1C',
    padding: width * 0.04,
    borderRadius: 12,
    marginBottom: height * 0.01,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  definitionButton: {
    backgroundColor: '#1C1C1C',
    padding: width * 0.04,
    borderRadius: 12,
    marginBottom: height * 0.01,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedButton: {
    borderColor: '#58CCF7',
    borderWidth: 2,
  },
  matchedButton: {
    backgroundColor: 'rgba(40, 167, 69, 0.2)',
    borderColor: '#28A745',
  },
  termText: {
    color: '#FFFFFF',
    fontSize: width * 0.038,
    fontWeight: '500',
  },
  definitionText: {
    color: '#FFFFFF',
    fontSize: width * 0.034,
    opacity: 0.9,
  },
  matchedText: {
    color: '#28A745',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
    opacity: 0.8,
  },
});