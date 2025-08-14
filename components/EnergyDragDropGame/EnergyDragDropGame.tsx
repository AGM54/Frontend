import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
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

  const handleSourceSelect = (sourceId: string) => {
    if (selectedSource === sourceId) {
      setSelectedSource(null);
    } else {
      setSelectedSource(sourceId);
    }
  };

  const handleZoneSelect = (zoneId: string) => {
    if (!selectedSource) {
      Alert.alert('Primero selecciona una fuente de energía', 'Toca una de las fuentes de energía de abajo para seleccionarla.');
      return;
    }

    const zone = zones.find(z => z.id === zoneId);
    if (zone?.filled) {
      Alert.alert('Esta posición ya está ocupada', 'Elige una posición vacía.');
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
          Alert.alert(
            '¡Excelente!',
            '¡Has completado correctamente todas las conexiones!',
            [{ text: 'Continuar', onPress: onComplete }]
          );
        }, 500);
      }
    } else {
      // Incorrect match
      Alert.alert('¡Inténtalo de nuevo!', 'Esa no es la conexión correcta. Piensa en qué fuente corresponde a cada tipo de planta.');
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
    </View>
  );
}
