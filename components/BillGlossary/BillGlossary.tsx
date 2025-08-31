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
      // Correct match
      setMatchedPairs([...matchedPairs, term.id]);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      
      if (matchedPairs.length + 1 === glossaryTerms.length) {
        // All matched
        setTimeout(() => {
          showSuccess(
            '¡Excelente trabajo! 🎉',
            `Has completado el glosario de facturación eléctrica en ${attempts + 1} intentos. ¡Ahora conoces mejor los términos de tu factura eléctrica!`,
            () => {
              setTimeout(() => {
                onComplete();
              }, 500);
            }
          );
        }, 500);
      }
    } else {
      // Wrong match
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDefinition(null);
        showError(
          '¡Inténtalo de nuevo! 💪',
          'Esa combinación no es correcta. Lee cuidadosamente cada definición y vuelve a intentar.'
        );
      }, 300);
    }
  };

  const resetGame = () => {
    setMatchedPairs([]);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setAttempts(0);
  };

  const progress = (matchedPairs.length / glossaryTerms.length) * 100;

  return (
    <View style={styles.container}>
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
            colors={['#58CCF7', '#60A5FA', '#3B82F6']}
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
                    ? ['#FF6B6B', '#FF8E8E', '#FFB3B3']
                    : term.color
                }
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
                    ? ['#FF6B6B', '#FF8E8E', '#FFB3B3']
                    : ['rgba(139, 69, 255, 0.3)', 'rgba(88, 204, 247, 0.2)']
                }
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
        {matchedPairs.length < glossaryTerms.length && (
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <LinearGradient
              colors={['#6C757D', '#545B62', '#454D55']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🔄 Reiniciar</Text>
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

      {/* Modal personalizado hermoso */}
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
  );
}
