import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface EnergySource {
  id: string;
  name: string;
  emoji: string;
  image: any;
  matched: boolean;
}

interface DropZone {
  id: string;
  name: string;
  image: any;
  filled: boolean;
  layout?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const energySources: EnergySource[] = [
  {
    id: 'water',
    name: 'Agua de ríos',
    emoji: '💧',
    image: require('../../assets/hidro.png'),
    matched: false,
  },
  {
    id: 'solar',
    name: 'Sol',
    emoji: '🌞',
    image: require('../../assets/solar.png'),
    matched: false,
  },
  {
    id: 'wind',
    name: 'Viento',
    emoji: '🌬️',
    image: require('../../assets/aerogenerador.png'),
    matched: false,
  },
  {
    id: 'biomass',
    name: 'Caña de azúcar',
    emoji: '🌿',
    image: require('../../assets/biomasa.png'),
    matched: false,
  },
  {
    id: 'thermal',
    name: 'Combustibles',
    emoji: '🛢️',
    image: require('../../assets/termica.png'),
    matched: false,
  },
];

const dropZones: DropZone[] = [
  {
    id: 'water',
    name: 'Central hidroeléctrica',
    image: require('../../assets/hidro.png'),
    filled: false,
  },
  {
    id: 'solar',
    name: 'Paneles solares',
    image: require('../../assets/solar.png'),
    filled: false,
  },
  {
    id: 'wind',
    name: 'Aerogeneradores',
    image: require('../../assets/aerogenerador.png'),
    filled: false,
  },
  {
    id: 'biomass',
    name: 'Planta de biomasa',
    image: require('../../assets/biomasa.png'),
    filled: false,
  },
  {
    id: 'thermal',
    name: 'Planta térmica',
    image: require('../../assets/termica.png'),
    filled: false,
  },
];

interface Props {
  onComplete: () => void;
}

export default function EnergyDragDropGame({ onComplete }: Props) {
  const [sources, setSources] = useState(energySources);
  const [zones, setZones] = useState(dropZones);
  const [score, setScore] = useState(0);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showOccupiedModal, setShowOccupiedModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSourceSelect = (sourceId: string) => {
    if (selectedSource === sourceId) {
      setSelectedSource(null);
    } else {
      setSelectedSource(sourceId);
    }
  };

  const handleZoneSelect = (zoneId: string) => {
    if (!selectedSource) {
      setShowSelectModal(true);
      return;
    }

    const zone = zones.find(z => z.id === zoneId);
    if (zone?.filled) {
      setShowOccupiedModal(true);
      return;
    }

    if (selectedSource === zoneId) {
      // Correct match
      setSources(prev => 
        prev.map(source => 
          source.id === selectedSource ? { ...source, matched: true } : source
        )
      );
      setZones(prev => 
        prev.map(zone => 
          zone.id === zoneId ? { ...zone, filled: true } : zone
        )
      );
      setScore(prev => prev + 1);
      setSelectedSource(null);
      
      if (score + 1 === 5) {
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 500);
      }
    } else {
      // Incorrect match
      setShowRetryModal(true);
      setSelectedSource(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Arrastra cada fuente a su imagen correspondiente</Text>
      
      <Text style={styles.score}>Conectadas: {score}/5</Text>

      {/* Drop Zones */}
      <View style={styles.dropZonesContainer}>
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone.id}
            style={[
              styles.dropZone,
              zone.filled && styles.filledDropZone
            ]}
            onPress={() => handleZoneSelect(zone.id)}
            disabled={zone.filled}
          >
            <View style={styles.imageContainer}>
              <Image source={zone.image} style={styles.dropZoneImage} />
            </View>
            <Text style={styles.dropZoneText}>{zone.name}</Text>
            {zone.filled && (
              <View style={styles.checkMark}>
                <Text style={styles.checkMarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Selectable Sources */}
      <View style={styles.sourcesContainer}>
        {sources.filter(source => !source.matched).map((source) => (
          <TouchableOpacity
            key={source.id}
            style={[
              styles.draggableItem,
              selectedSource === source.id && styles.selectedItem
            ]}
            onPress={() => handleSourceSelect(source.id)}
          >
            <Text style={styles.sourceEmoji}>{source.emoji}</Text>
            <Text style={styles.sourceText}>{source.name}</Text>
            {selectedSource === source.id && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedIndicatorText}>👆</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {score === 5 && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>¡Perfecto! 🎉</Text>
          <Text style={styles.completionSubText}>Has conectado todas las fuentes correctamente</Text>
        </View>
      )}

      {/* Modal: Selecciona una fuente */}
      <Modal transparent visible={showSelectModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Primero selecciona una fuente de energía</Text>
            <Text style={styles.modalMessage}>Toca una de las fuentes de energía de abajo para seleccionarla.</Text>
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

      {/* Modal: Posición ocupada */}
      <Modal transparent visible={showOccupiedModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Esta posición ya está ocupada</Text>
            <Text style={styles.modalMessage}>Elige una posición vacía.</Text>
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
            <Text style={styles.modalMessage}>Esa no es la conexión correcta. Piensa en qué fuente corresponde a cada tipo de planta.</Text>
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
            <Text style={styles.modalMessage}>¡Has completado correctamente todas las conexiones!</Text>
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
