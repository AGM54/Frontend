import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import CustomModal from '../CustomModal';
import { useCustomModal } from '../../hooks/useCustomModal';

const { width, height } = Dimensions.get('window');

interface FacturaSectionData {
  id: number;
  title: string;
  explanation: string;
  position: { top: number; left: number; width: number; height: number };
}

interface FacturaExplorerProps {
  onComplete: () => void;
}

const facturaSections: FacturaSectionData[] = [
  {
    id: 1,
    title: 'Datos del cliente',
    explanation: 'Tu nombre, dirección y número de servicio para identificar tu cuenta.',
    position: { top: 15, left: 10, width: 80, height: 15 },
  },
  {
    id: 2,
    title: 'Fecha de emisión',
    explanation: 'Día en que se generó la factura.',
    position: { top: 35, left: 10, width: 40, height: 10 },
  },
  {
    id: 3,
    title: 'Fecha de vencimiento',
    explanation: 'Día límite para pagar sin recargos.',
    position: { top: 35, left: 55, width: 35, height: 10 },
  },
  {
    id: 4,
    title: 'Consumo en kWh',
    explanation: 'Cuánta energía usaste ese mes (más consumo = más pago).',
    position: { top: 50, left: 10, width: 35, height: 15 },
  },
  {
    id: 5,
    title: 'Total a pagar',
    explanation: 'Lo que debes pagar, incluyendo impuestos y otros cargos.',
    position: { top: 50, left: 50, width: 40, height: 15 },
  },
  {
    id: 6,
    title: 'Historial de consumo',
    explanation: 'Gráfico con tu consumo en meses anteriores.',
    position: { top: 70, left: 10, width: 80, height: 20 },
  },
];

export default function FacturaExplorer({ onComplete }: FacturaExplorerProps) {
  const [exploredSections, setExploredSections] = useState<number[]>([]);
  const [selectedSection, setSelectedSection] = useState<FacturaSectionData | null>(null);
  const { modalConfig, isVisible, hideModal, showSuccess, showWarning } = useCustomModal();

  const handleSectionPress = (section: FacturaSectionData) => {
    setSelectedSection(section);
    if (!exploredSections.includes(section.id)) {
      setExploredSections([...exploredSections, section.id]);
    }
  };

  const handleCloseExplanation = () => {
    setSelectedSection(null);
  };

  const handleComplete = () => {
    if (exploredSections.length === facturaSections.length) {
      showSuccess(
        '¡Excelente! 🎉',
        'Has explorado todas las secciones de la factura eléctrica. ¡Ahora entiendes mejor cómo leer tu factura mensual!',
        () => {
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      );
    } else {
      showWarning(
        '¡Sigue explorando! 🔍',
        `Te faltan ${facturaSections.length - exploredSections.length} secciones por descubrir. Explora todas las áreas para comprender completamente tu factura.`
      );
    }
  };

  const progress = (exploredSections.length / facturaSections.length) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Explora la factura</Text>
      <Text style={styles.instruction}>
        Haz clic en cada sección de la factura para conocer su significado:
      </Text>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Explorado: {exploredSections.length}/{facturaSections.length}
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

      {/* Simulated Invoice */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 255, 0.9)']}
        style={styles.invoiceContainer}
      >
        <Text style={styles.invoiceTitle}>FACTURA ELÉCTRICA</Text>
        
        {/* Clickable Sections */}
        {facturaSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.clickableSection,
              {
                top: `${section.position.top}%`,
                left: `${section.position.left}%`,
                width: `${section.position.width}%`,
                height: `${section.position.height}%`,
              },
              exploredSections.includes(section.id) && styles.exploredSection,
            ]}
            onPress={() => handleSectionPress(section)}
          >
            <LinearGradient
              colors={
                exploredSections.includes(section.id)
                  ? ['rgba(40, 167, 69, 0.3)', 'rgba(52, 206, 87, 0.2)']
                  : ['rgba(139, 69, 255, 0.3)', 'rgba(88, 204, 247, 0.2)']
              }
              style={styles.sectionGradient}
            >
              <Text style={styles.sectionLabel}>{section.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </LinearGradient>

      {/* Complete Button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <LinearGradient
          colors={['#58CCF7', '#4A9FE7', '#3B82F6']}
          style={styles.completeButtonGradient}
        >
          <Text style={styles.completeButtonText}>
            {exploredSections.length === facturaSections.length ? '✅ Finalizar' : '🔍 Verificar progreso'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Explanation Modal */}
      {selectedSection && (
        <View style={styles.explanationOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            style={styles.explanationCard}
          >
            <Text style={styles.explanationTitle}>{selectedSection.title}</Text>
            <Text style={styles.explanationText}>{selectedSection.explanation}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseExplanation}
            >
              <Text style={styles.closeButtonText}>Entendido ✅</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

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
