import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import CustomModal from '../CustomModal';
import { useCustomModal } from '../../hooks/useCustomModal';

const { width, height } = Dimensions.get('window');

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  icon: string;
  color: string[];
}

interface BillGlossaryProps {
  onComplete: () => void;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: 1,
    term: 'Tarifa',
    definition: 'Precio por cada kilovatio hora consumido.',
    icon: '💰',
    color: ['#FF6B6B', '#FF8E8E', '#FFB3B3'],
  },
  {
    id: 2,
    term: 'kWh',
    definition: 'Unidad de medida de energía.',
    icon: '⚡',
    color: ['#4ECDC4', '#45B7D1', '#3B82F6'],
  },
  {
    id: 3,
    term: 'Distribuidora',
    definition: 'Empresa que entrega la electricidad a tu hogar.',
    icon: '🏢',
    color: ['#96CEB4', '#85C1A1', '#74B49B'],
  },
  {
    id: 4,
    term: 'Factura eléctrica',
    definition: 'Documento que muestra tu consumo y cuánto debes pagar.',
    icon: '📄',
    color: ['#FECA57', '#FF9F43', '#FF7675'],
  },
  {
    id: 5,
    term: 'CNEE',
    definition: 'Comisión que regula el precio y calidad del servicio eléctrico.',
    icon: '🛡️',
    color: ['#A29BFE', '#6C5CE7', '#5A67D8'],
  },
];

export default function BillGlossary({ onComplete }: BillGlossaryProps) {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<GlossaryTerm | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const { modalConfig, isVisible, hideModal, showSuccess, showError } = useCustomModal();

  // Shuffle definitions for the matching game
  const [shuffledDefinitions] = useState(
    [...glossaryTerms].sort(() => Math.random() - 0.5)
  );

  const progress = (matchedPairs.length / glossaryTerms.length) * 100;

  const handleTermPress = (term: GlossaryTerm) => {
    if (matchedPairs.includes(term.id)) return;
    setSelectedTerm(term);
    if (selectedDefinition) {
      checkMatch(term, selectedDefinition);
    }
  };

  const handleDefinitionPress = (definition: GlossaryTerm) => {
    if (matchedPairs.includes(definition.id)) return;
    setSelectedDefinition(definition);
    if (selectedTerm) {
      checkMatch(selectedTerm, definition);
    }
  };

  const checkMatch = (term: GlossaryTerm, definition: GlossaryTerm) => {
    setAttempts(attempts + 1);

    if (term.id === definition.id) {
      // Match successful
      setMatchedPairs([...matchedPairs, term.id]);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      if (matchedPairs.length + 1 === glossaryTerms.length) {
        showSuccess('¡Felicidades!', 'Has completado correctamente el glosario de facturación eléctrica.');
      } else {
        showSuccess('¡Correcto!', `Has emparejado correctamente "${term.term}".`);
      }
    } else {
      // Match failed
      setSelectedTerm(null);
      setSelectedDefinition(null);
      showError('Incorrecto', 'Intenta de nuevo. Revisa cuidadosamente las definiciones.');
    }
  };

  const resetGame = () => {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatchedPairs([]);
    setAttempts(0);
  };

  const isGameComplete = matchedPairs.length === glossaryTerms.length;

  return (
    <LinearGradient
      colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#2d1b4d', '#1a0033']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: 'transparent', flex: 1 }]}> 
        <Text style={styles.title}>📚 Glosario de facturación eléctrica</Text>
        <Text style={styles.instruction}>
          Empareja cada término con su definición correcta:
        </Text>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Emparejados: {matchedPairs.length}/{glossaryTerms.length}
          </Text>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#8B45FF', '#58CCF7', '#3B82F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

        <ScrollView style={styles.gameContainer} showsVerticalScrollIndicator={false}>
          {/* Terms Section */}
          <Text style={styles.sectionTitle}>🏷️ TÉRMINOS</Text>
          <View style={styles.termsContainer}>
            {glossaryTerms.map((term) => (
              <TouchableOpacity
                key={`term-${term.id}`}
                style={[
                  styles.termCard,
                  selectedTerm?.id === term.id && styles.selectedCard,
                  matchedPairs.includes(term.id) && styles.matchedCard,
                ]}
                onPress={() => handleTermPress(term)}
                disabled={matchedPairs.includes(term.id)}
              >
                <LinearGradient
                  colors={
                    matchedPairs.includes(term.id)
                      ? ['#28A745', '#34CE57', '#40E869']
                      : selectedTerm?.id === term.id
                      ? ['#A855F7', '#8B5CF6', '#7C3AED']
                      : ['#6366F1', '#8B5CF6', '#A855F7']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <Text style={styles.termIcon}>{term.icon}</Text>
                  <Text style={styles.termText}>{term.term}</Text>
                  {matchedPairs.includes(term.id) && (
                    <Text style={styles.checkIcon}>✅</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Definitions Section */}
          <Text style={styles.sectionTitle}>📖 DEFINICIONES</Text>
          <View style={styles.definitionsContainer}>
            {shuffledDefinitions.map((definition) => (
              <TouchableOpacity
                key={`def-${definition.id}`}
                style={[
                  styles.definitionCard,
                  selectedDefinition?.id === definition.id && styles.selectedCard,
                  matchedPairs.includes(definition.id) && styles.matchedCard,
                ]}
                onPress={() => handleDefinitionPress(definition)}
                disabled={matchedPairs.includes(definition.id)}
              >
                <LinearGradient
                  colors={
                    matchedPairs.includes(definition.id)
                      ? ['#28A745', '#34CE57', '#40E869']
                      : selectedDefinition?.id === definition.id
                      ? ['#7C3AED', '#8B5CF6', '#A855F7']
                      : ['#4F46E5', '#7C3AED', '#8B5CF6']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.definitionGradient}
                >
                  <Text style={styles.definitionText}>{definition.definition}</Text>
                  {matchedPairs.includes(definition.id) && (
                    <Text style={styles.checkIconDef}>✅</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {!isGameComplete ? (
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <LinearGradient
                colors={['#6C757D', '#545B62', '#454D55']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>🔄 Reiniciar</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.continueButton} onPress={onComplete}>
              <LinearGradient
                colors={['#28A745', '#34CE57', '#40E869']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>✅ Continuar</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* Game Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Intentos: {attempts} | Aciertos: {matchedPairs.length}
          </Text>
        </View>

        {/* Modal personalizado */}
        {modalConfig && (
          <CustomModal
            visible={isVisible}
            title={modalConfig.title}
            message={modalConfig.message}
            type={modalConfig.type}
            buttons={modalConfig.buttons}
            onClose={hideModal}
            icon={modalConfig.icon}
          />
        )}
      </View>
    </LinearGradient>
  );
}
