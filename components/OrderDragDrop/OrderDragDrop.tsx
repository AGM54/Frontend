import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface OrderDragDropProps {
  onComplete: () => void;
}

const processSteps: ProcessStep[] = [
  {
    id: 3,
    title: 'Distribución',
    description: 'La energía llega a tu hogar a través de postes y cables locales',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Transmisión',
    description: 'La electricidad viaja por líneas de alto voltaje',
    icon: '⚡',
  },
  {
    id: 1,
    title: 'Generación',
    description: 'Se produce la electricidad en las plantas generadoras',
    icon: '🔋',
  },
];

const correctOrder = [1, 2, 3]; // Generación, Transmisión, Distribución

export default function OrderDragDrop({ onComplete }: OrderDragDropProps) {
  const [currentOrder, setCurrentOrder] = useState<ProcessStep[]>([...processSteps]);
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkOrder = () => {
    const userOrder = currentOrder.map(step => step.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    setAttempts(attempts + 1);
    
    if (isCorrect) {
      setIsComplete(true);
      Alert.alert(
        '¡Excelente! 🎉',
        'Has ordenado correctamente las etapas del proceso eléctrico.',
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
        '¡Inténtalo de nuevo! 💪',
        `El orden correcto es: Generación → Transmisión → Distribución\n\nIntentos: ${attempts + 1}`,
        [{ text: 'Seguir intentando' }]
      );
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newOrder = [...currentOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    setCurrentOrder(newOrder);
  };

  const resetOrder = () => {
    setCurrentOrder([...processSteps]);
    setAttempts(0);
    setIsComplete(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Actividad final: ¿Cómo llega la luz?</Text>
      <Text style={styles.instruction}>
        Arrastra las etapas del proceso de la electricidad al orden correcto:
      </Text>

      {/* Hint */}
      <LinearGradient
        colors={['rgba(88, 204, 247, 0.2)', 'rgba(139, 69, 255, 0.2)']}
        style={styles.hintBox}
      >
        <Text style={styles.hintText}>
          💡 Piensa en el recorrido desde donde se produce hasta donde la usas
        </Text>
      </LinearGradient>

      {/* Draggable Items */}
      <View style={styles.itemsContainer}>
        {currentOrder.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[
              styles.stepCard,
              isComplete && styles.completedCard
            ]}
          >
            <LinearGradient
              colors={
                isComplete
                  ? ['#28A745', '#34CE57', '#40E869']
                  : step.id === 1
                  ? ['#FF6B6B', '#FF8E8E', '#FFB3B3']
                  : step.id === 2
                  ? ['#4ECDC4', '#45B7D1', '#3B82F6']
                  : ['#96CEB4', '#85C1A1', '#74B49B']
              }
              style={styles.stepGradient}
            >
              <View style={styles.stepHeader}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>

              {/* Move buttons */}
              {!isComplete && (
                <View style={styles.moveButtons}>
                  {index > 0 && (
                    <TouchableOpacity
                      style={styles.moveButton}
                      onPress={() => moveItem(index, index - 1)}
                    >
                      <Text style={styles.moveButtonText}>↑</Text>
                    </TouchableOpacity>
                  )}
                  {index < currentOrder.length - 1 && (
                    <TouchableOpacity
                      style={styles.moveButton}
                      onPress={() => moveItem(index, index + 1)}
                    >
                      <Text style={styles.moveButtonText}>↓</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {!isComplete && (
          <>
            <TouchableOpacity style={styles.checkButton} onPress={checkOrder}>
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7', '#3B82F6']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>✅ Verificar Orden</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetOrder}>
              <LinearGradient
                colors={['#6C757D', '#545B62', '#454D55']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>🔄 Reiniciar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Progress indicator */}
      {attempts > 0 && (
        <Text style={styles.attemptsText}>
          Intentos: {attempts} {isComplete ? '🎯' : ''}
        </Text>
      )}
    </View>
  );
}
