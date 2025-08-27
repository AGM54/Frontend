import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width } = Dimensions.get('window');

interface MeterReadingProps {
  onComplete: () => void;
}

const MeterReading: React.FC<MeterReadingProps> = ({ onComplete }) => {
  const [currentReading, setCurrentReading] = useState([1, 2, 3, 4, 5]);
  const [userInput, setUserInput] = useState(['', '', '', '', '']);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDigit, setSelectedDigit] = useState<number | null>(null);

  // Animation values for meter digits
  const digitAnimations = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Animate the meter digits on mount
    const animations = digitAnimations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 2000 + index * 300,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  const handleDigitInput = (digit: string) => {
    if (selectedDigit !== null && selectedDigit >= 0 && selectedDigit < 5) {
      const newInput = [...userInput];
      newInput[selectedDigit] = digit;
      setUserInput(newInput);
      
      // Move to next digit or complete
      if (selectedDigit < 4) {
        setSelectedDigit(selectedDigit + 1);
      } else {
        setSelectedDigit(null);
      }
    }
  };

  const checkReading = () => {
    const isCorrect = userInput.every((digit, index) => 
      parseInt(digit) === currentReading[index]
    );

    if (isCorrect) {
      setIsCompleted(true);
      Alert.alert('¡Excelente!', 'Has leído correctamente el medidor eléctrico.');
    } else {
      Alert.alert('Intenta de nuevo', 'Revisa los dígitos del medidor cuidadosamente.');
    }
  };

  const resetReading = () => {
    setUserInput(['', '', '', '', '']);
    setSelectedDigit(0);
  };

  const renderMeterDigit = (digit: number, index: number) => {
    const rotation = digitAnimations[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View key={index} style={styles.meterDigitContainer}>
        <Animated.View 
          style={[
            styles.meterDigit,
            { transform: [{ rotate: rotation }] }
          ]}
        >
          <Text style={styles.meterDigitText}>{digit}</Text>
        </Animated.View>
      </View>
    );
  };

  const renderInputBox = (index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.inputBox,
        selectedDigit === index && styles.selectedInputBox
      ]}
      onPress={() => setSelectedDigit(index)}
    >
      <Text style={styles.inputText}>
        {userInput[index] || '?'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Lectura del Medidor</Text>
      <Text style={styles.instruction}>
        Lee los dígitos del medidor eléctrico y escribe la lectura correcta
      </Text>

      {/* Meter Display */}
      <LinearGradient
        colors={['#2C3E50', '#34495E']}
        style={styles.meterContainer}
      >
        <Text style={styles.meterLabel}>kWh</Text>
        <View style={styles.meterDigitsRow}>
          {currentReading.map(renderMeterDigit)}
        </View>
      </LinearGradient>

      {/* Input Section */}
      <Text style={styles.inputLabel}>Tu lectura:</Text>
      <View style={styles.inputRow}>
        {Array.from({ length: 5 }, (_, index) => renderInputBox(index))}
      </View>

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {Array.from({ length: 10 }, (_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.numberButton}
            onPress={() => handleDigitInput(i.toString())}
            disabled={selectedDigit === null}
          >
            <Text style={styles.numberButtonText}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.resetButton} onPress={resetReading}>
          <Text style={styles.resetButtonText}>Reiniciar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.checkButton,
            userInput.every(digit => digit !== '') && styles.checkButtonActive
          ]} 
          onPress={checkReading}
          disabled={!userInput.every(digit => digit !== '')}
        >
          <Text style={styles.checkButtonText}>Verificar</Text>
        </TouchableOpacity>
      </View>

      {isCompleted && (
        <TouchableOpacity style={styles.continueButton} onPress={onComplete}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MeterReading;
