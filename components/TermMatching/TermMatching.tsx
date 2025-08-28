import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface Term {
  id: string;
  name: string;
  emoji: string;
  image: any;
  matched: boolean;
}

interface Definition {
  id: string;
  text: string;
  matched: boolean;
}

const terms: Term[] = [
  {
    id: 'distribuidora',
    name: 'Distribuidora',
    emoji: '🏢',
    image: require('../../assets/cables.png'),
    matched: false,
  },
  {
    id: 'contador',
    name: 'Contador',
    emoji: '⚡',
    image: require('../../assets/contador.png'),
    matched: false,
  },
  {
    id: 'tarifa',
    name: 'Tarifa',
    emoji: '💰',
    image: require('../../assets/recibo.png'),
    matched: false,
  },
  {
    id: 'reclamo',
    name: 'Reclamo',
    emoji: '📋',
    image: require('../../assets/usuario.png'),
    matched: false,
  },
];

const definitions: Definition[] = [
  {
    id: 'distribuidora',
    text: 'Empresa que lleva la electricidad a tu casa y mantiene la infraestructura eléctrica en buen estado.',
    matched: false,
  },
  {
    id: 'contador',
    text: 'Aparato que mide cuánta energía consumes y debe estar calibrado correctamente.',
    matched: false,
  },
  {
    id: 'tarifa',
    text: 'Precio que pagas por cada kilovatio-hora (kWh) de electricidad consumido.',
    matched: false,
  },
  {
    id: 'reclamo',
    text: 'Solicitud que haces si detectas un error en tu factura o problemas con el servicio.',
    matched: false,
  },
].sort(() => Math.random() - 0.5); // Shuffle definitions

interface Props {
  onComplete: () => void;
}

export default function TermMatching({ onComplete }: Props) {
  const [termsList, setTermsList] = useState(terms);
  const [definitionsList, setDefinitionsList] = useState(definitions);
  const [score, setScore] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOccupiedModal, setShowOccupiedModal] = useState(false);

  const handleTermSelect = (termId: string) => {
    if (selectedTerm === termId) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(termId);
    }
  };

  const handleDefinitionSelect = (definitionId: string) => {
    if (!selectedTerm) {
      setShowSelectModal(true);
      return;
    }

    const definition = definitionsList.find(d => d.id === definitionId);
    if (definition?.matched) {
      setShowOccupiedModal(true);
      return;
    }

    if (selectedTerm === definitionId) {
      // Correct match
      setTermsList(prev => 
        prev.map(term => 
          term.id === selectedTerm ? { ...term, matched: true } : term
        )
      );
      setDefinitionsList(prev => 
        prev.map(def => 
          def.id === definitionId ? { ...def, matched: true } : def
        )
      );
      setScore(prev => prev + 1);
      setSelectedTerm(null);
      
      if (score + 1 === 4) {
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 500);
      }
    } else {
      // Incorrect match
      setShowRetryModal(true);
      setSelectedTerm(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Empareja cada término con su definición</Text>
      
      <Text style={styles.score}>Conectados: {score}/4</Text>

      {/* Terms Section */}
      <View style={styles.termsSection}>
        <Text style={styles.sectionTitle}>📚 Términos</Text>
        <View style={styles.termsContainer}>
          {termsList.filter(term => !term.matched).map((term) => (
            <TouchableOpacity
              key={term.id}
              style={[
                styles.termCard,
                selectedTerm === term.id && styles.selectedTermCard
              ]}
              onPress={() => handleTermSelect(term.id)}
            >
              <LinearGradient
                colors={selectedTerm === term.id 
                  ? ['rgba(139, 69, 255, 0.4)', 'rgba(75, 0, 130, 0.5)']
                  : ['rgba(45, 27, 77, 0.3)', 'rgba(26, 0, 51, 0.4)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.termCardGradient}
              >
                <View style={styles.termImageContainer}>
                  <Image source={term.image} style={styles.termImage} />
                </View>
                <Text style={styles.termEmoji}>{term.emoji}</Text>
                <Text style={styles.termText}>{term.name}</Text>
                {selectedTerm === term.id && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedIndicatorText}>👆</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Definitions Section */}
      <View style={styles.definitionsSection}>
        <Text style={styles.sectionTitle}>📖 Definiciones</Text>
        <View style={styles.definitionsContainer}>
          {definitionsList.map((definition) => (
            <TouchableOpacity
              key={definition.id}
              style={[
                styles.definitionCard,
                definition.matched && styles.matchedDefinitionCard
              ]}
              onPress={() => handleDefinitionSelect(definition.id)}
              disabled={definition.matched}
            >
              <LinearGradient
                colors={definition.matched 
                  ? ['rgba(0, 255, 0, 0.3)', 'rgba(0, 200, 0, 0.4)']
                  : ['rgba(45, 27, 77, 0.2)', 'rgba(26, 0, 51, 0.3)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.definitionCardGradient}
              >
                <Text style={styles.definitionText}>{definition.text}</Text>
                {definition.matched && (
                  <View style={styles.checkMark}>
                    <Text style={styles.checkMarkText}>✓</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {score === 4 && (
        <LinearGradient
          colors={['rgba(0, 255, 0, 0.3)', 'rgba(0, 200, 0, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.completionMessage}
        >
          <Text style={styles.completionTitle}>¡Perfecto! 🎉</Text>
          <Text style={styles.completionText}>Has emparejado todos los términos correctamente</Text>
        </LinearGradient>
      )}

      {/* Modal: Selecciona un término */}
      <Modal transparent visible={showSelectModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Primero selecciona un término</Text>
            <Text style={styles.modalMessage}>Toca uno de los términos de arriba para seleccionarlo.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowSelectModal(false)}
            >
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Modal: Definición ocupada */}
      <Modal transparent visible={showOccupiedModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Esta definición ya está emparejada</Text>
            <Text style={styles.modalMessage}>Elige una definición que no esté emparejada.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowOccupiedModal(false)}
            >
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Modal: Inténtalo de nuevo */}
      <Modal transparent visible={showRetryModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>¡Inténtalo de nuevo!</Text>
            <Text style={styles.modalMessage}>Esa no es la definición correcta. Piensa en el significado de cada término.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowRetryModal(false)}
            >
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Modal: ¡Excelente! */}
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>¡Excelente!</Text>
            <Text style={styles.modalMessage}>¡Has completado correctamente todos los emparejamientos!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowSuccessModal(false);
                onComplete();
              }}
            >
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>Continuar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
}
