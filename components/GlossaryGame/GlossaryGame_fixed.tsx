import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
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
    definition: "Precio que pagas por la electricidad",
    color: '#FF6B6B'
  },
  {
    id: 2,
    term: "Servicio regulado",
    definition: "Electricidad con precio y calidad supervisados que se brinda a los usuarios residenciales",
    color: '#4ECDC4'
  },
  {
    id: 3,
    term: "Norma técnica",
    definition: "Regla que asegura el buen funcionamiento del sistema",
    color: '#45B7D1'
  },
  {
    id: 4,
    term: "Distribuidor",
    definition: "Empresa que lleva la electricidad hasta tu hogar",
    color: '#96CEB4'
  },
  {
    id: 5,
    term: "Usuario residencial",
    definition: "Persona que recibe y paga el servicio de energía",
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
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<Term | null>(null);

  useEffect(() => {
    // Mezclar las definiciones al inicio
    setDefinitions([...terms].sort(() => Math.random() - 0.5));
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
  }, [selectedTerm, selectedDefinition, matchedPairs, onComplete]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shake }] }]}>
      <Text style={styles.title}>Selecciona un término y su definición</Text>

      {/* Términos */}
      <View style={styles.termsContainer}>
        <Text style={styles.sectionTitle}>Términos:</Text>
        {terms.map((term) => (
          <TouchableOpacity
            key={term.id}
            onPress={() => handleTermPress(term)}
            disabled={matchedPairs.includes(term.id)}
            style={[
              styles.termButton,
              selectedTerm?.id === term.id && styles.selectedButton,
              matchedPairs.includes(term.id) && styles.matchedButton
            ]}
          >
            <Text style={[
              styles.termText,
              matchedPairs.includes(term.id) && styles.matchedText
            ]}>
              {term.term}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Definiciones */}
      <View style={styles.definitionsContainer}>
        <Text style={styles.sectionTitle}>Definiciones:</Text>
        {definitions.map((def) => (
          <TouchableOpacity
            key={def.id}
            onPress={() => handleDefinitionPress(def)}
            disabled={matchedPairs.includes(def.id)}
            style={[
              styles.definitionButton,
              { backgroundColor: def.color },
              selectedDefinition?.id === def.id && styles.selectedButton,
              matchedPairs.includes(def.id) && styles.matchedButton
            ]}
          >
            <Text style={[
              styles.definitionText,
              matchedPairs.includes(def.id) && styles.matchedText
            ]}>
              {def.definition}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {matchedPairs.length} de {terms.length} pares encontrados
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: height * 0.015,
    opacity: 0.9,
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
    padding: width * 0.04,
    borderRadius: 12,
    marginBottom: height * 0.01,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.8,
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