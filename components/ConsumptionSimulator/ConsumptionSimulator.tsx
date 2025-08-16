import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface ConsumptionData {
  kWh: number;
  estimatedPayment: number;
  category: string;
  color: string[];
}

interface ConsumptionSimulatorProps {
  onComplete: () => void;
}

const consumptionOptions: ConsumptionData[] = [
  {
    kWh: 30,
    estimatedPayment: 25,
    category: 'Consumo Bajo',
    color: ['#28A745', '#34CE57', '#40E869'],
  },
  {
    kWh: 100,
    estimatedPayment: 80,
    category: 'Consumo Medio',
    color: ['#FFC107', '#FFD54F', '#FFF59D'],
  },
  {
    kWh: 200,
    estimatedPayment: 160,
    category: 'Consumo Alto',
    color: ['#DC3545', '#F28B82', '#FFCDD2'],
  },
  {
    kWh: 350,
    estimatedPayment: 280,
    category: 'Consumo Muy Alto',
    color: ['#6F42C1', '#9C27B0', '#E1BEE7'],
  },
];

export default function ConsumptionSimulator({ onComplete }: ConsumptionSimulatorProps) {
  const [selectedConsumption, setSelectedConsumption] = useState<ConsumptionData | null>(null);
  const [hasSimulated, setHasSimulated] = useState(false);

  const handleConsumptionSelect = (consumption: ConsumptionData) => {
    setSelectedConsumption(consumption);
    setHasSimulated(true);
  };

  const handleComplete = () => {
    if (hasSimulated) {
      Alert.alert(
        '¡Muy bien! 🎉',
        'Has aprendido cómo se calcula tu factura eléctrica basada en el consumo.',
        [
          {
            text: 'Continuar',
            onPress: () => {
              setTimeout(() => {
                onComplete();
              }, 500);
            }
          }
        ]
      );
    } else {
      Alert.alert(
        '¡Haz una simulación! 🧮',
        'Selecciona un nivel de consumo para ver cómo se calcula el pago.',
        [{ text: 'Entendido' }]
      );
    }
  };

  const resetSimulation = () => {
    setSelectedConsumption(null);
    setHasSimulated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧮 Simulador de consumo</Text>
      <Text style={styles.instruction}>
        Arrastra el consumo (kWh) al medidor y observa cuánto pagarías:
      </Text>

      {/* Hint */}
      <LinearGradient
        colors={['rgba(88, 204, 247, 0.2)', 'rgba(139, 69, 255, 0.2)']}
        style={styles.hintBox}
      >
        <Text style={styles.hintText}>
          💡 Recuerda: Entre menos consumes, menos pagas
        </Text>
      </LinearGradient>

      {/* Digital Meter Display */}
      <LinearGradient
        colors={['rgba(26, 0, 51, 0.9)', 'rgba(45, 27, 77, 0.8)']}
        style={styles.meterContainer}
      >
        <Text style={styles.meterTitle}>⚡ Medidor Digital</Text>
        <View style={styles.meterDisplay}>
          <Text style={styles.meterValue}>
            {selectedConsumption ? selectedConsumption.kWh : '000'} kWh
          </Text>
          <Text style={styles.meterLabel}>Consumo del mes</Text>
        </View>
        
        {selectedConsumption && (
          <LinearGradient
            colors={selectedConsumption.color}
            style={styles.resultCard}
          >
            <Text style={styles.resultTitle}>{selectedConsumption.category}</Text>
            <Text style={styles.resultPayment}>Q. {selectedConsumption.estimatedPayment}.00</Text>
            <Text style={styles.resultLabel}>Estimación de pago</Text>
          </LinearGradient>
        )}
      </LinearGradient>

      {/* Consumption Options */}
      <Text style={styles.optionsTitle}>Selecciona un nivel de consumo:</Text>
      <View style={styles.optionsContainer}>
        {consumptionOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              selectedConsumption?.kWh === option.kWh && styles.selectedOption,
            ]}
            onPress={() => handleConsumptionSelect(option)}
          >
            <LinearGradient
              colors={
                selectedConsumption?.kWh === option.kWh 
                  ? option.color
                  : ['rgba(139, 69, 255, 0.3)', 'rgba(88, 204, 247, 0.2)']
              }
              style={styles.optionGradient}
            >
              <Text style={styles.optionKwh}>{option.kWh} kWh</Text>
              <Text style={styles.optionCategory}>{option.category}</Text>
              <Text style={styles.optionPayment}>≈ Q. {option.estimatedPayment}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Educational Note */}
      {selectedConsumption && (
        <LinearGradient
          colors={['rgba(139, 69, 255, 0.2)', 'rgba(88, 204, 247, 0.1)']}
          style={styles.educationalNote}
        >
          <Text style={styles.noteTitle}>📚 ¿Sabías que?</Text>
          <Text style={styles.noteText}>
            {selectedConsumption.kWh <= 88 
              ? 'Con este consumo podrías calificar para la tarifa social subsidiada.'
              : selectedConsumption.kWh <= 150
              ? 'Este es un consumo típico para una familia guatemalteca.'
              : 'Este nivel de consumo sugiere un uso intensivo de electrodomésticos.'}
          </Text>
        </LinearGradient>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <LinearGradient
            colors={['#58CCF7', '#4A9FE7', '#3B82F6']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {hasSimulated ? '✅ Continuar' : '🔍 Simular primero'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {hasSimulated && (
          <TouchableOpacity style={styles.resetButton} onPress={resetSimulation}>
            <LinearGradient
              colors={['#6C757D', '#545B62', '#454D55']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🔄 Nueva simulación</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {/* CNEE Link Info */}
      <LinearGradient
        colors={['rgba(40, 167, 69, 0.2)', 'rgba(52, 206, 87, 0.1)']}
        style={styles.linkInfo}
      >
        <Text style={styles.linkTitle}>🔗 Simulador oficial CNEE</Text>
        <Text style={styles.linkText}>
          Puedes usar el simulador oficial en el sitio web de la CNEE para cálculos más precisos
        </Text>
      </LinearGradient>
    </View>
  );
}
