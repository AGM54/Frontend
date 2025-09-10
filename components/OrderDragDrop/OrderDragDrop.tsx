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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const checkOrder = () => {
    const userOrder = currentOrder.map(step => step.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);

    setAttempts(attempts + 1);

    if (isCorrect) {
      setIsComplete(true);
      setShowSuccessModal(true);
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
    setShowSuccessModal(false);
  };

  return (
    <LinearGradient
      colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { backgroundColor: 'transparent' }]}
    >
      {/* Fondo decorativo con efectos de partículas */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
      }}>
        <Text style={{ position: 'absolute', top: '10%', left: '5%', fontSize: width * 0.04, color: '#58CCF7' }}>✨</Text>
        <Text style={{ position: 'absolute', top: '20%', right: '8%', fontSize: width * 0.03, color: '#B844D8' }}>⭐</Text>
        <Text style={{ position: 'absolute', top: '40%', left: '2%', fontSize: width * 0.025, color: '#58CCF7' }}>💫</Text>
        <Text style={{ position: 'absolute', top: '60%', right: '5%', fontSize: width * 0.035, color: '#8B45FF' }}>✨</Text>
        <Text style={{ position: 'absolute', top: '80%', left: '7%', fontSize: width * 0.03, color: '#B844D8' }}>⭐</Text>
      </View>

      <Text style={styles.title}>🎮 Actividad final: ¿Cómo llega la luz?</Text>
      <Text style={styles.instruction}>
        Arrastra las etapas del proceso de la electricidad al orden correcto:
      </Text>

      {/* Hint */}
      <LinearGradient
        colors={['rgba(139, 69, 255, 0.4)', 'rgba(88, 204, 247, 0.3)', 'rgba(184, 68, 216, 0.4)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
                  ? ['#28A745', '#34CE57', '#40E869', '#28A745']
                  : step.id === 1
                  ? ['#8B45FF', '#B844D8', '#C147E9', '#8B45FF']
                  : step.id === 2
                  ? ['#58CCF7', '#7DD3FC', '#38BDF8', '#58CCF7']
                  : ['#B844D8', '#D946EF', '#E879F9', '#B844D8']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stepGradient}
            >
              <View style={styles.stepHeader}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                  style={{
                    borderRadius: width * 0.04,
                    width: width * 0.08,
                    height: width * 0.08,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[styles.stepNumber, { color: '#1a0033' }]}>{index + 1}</Text>
                </LinearGradient>
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
                      <LinearGradient
                        colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                        style={{
                          borderRadius: width * 0.06,
                          width: width * 0.12,
                          height: width * 0.12,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.moveButtonText}>↑</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  {index < currentOrder.length - 1 && (
                    <TouchableOpacity
                      style={styles.moveButton}
                      onPress={() => moveItem(index, index + 1)}
                    >
                      <LinearGradient
                        colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                        style={{
                          borderRadius: width * 0.06,
                          width: width * 0.12,
                          height: width * 0.12,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.moveButtonText}>↓</Text>
                      </LinearGradient>
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
                colors={['#58CCF7', '#8B45FF', '#B844D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Verificar Orden</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetOrder}>
              <LinearGradient
                colors={['#8B45FF', '#6D28D9', '#4C1D95']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
        <LinearGradient
          colors={['rgba(139, 69, 255, 0.3)', 'rgba(88, 204, 247, 0.2)']}
          style={{
            borderRadius: 12,
            padding: width * 0.03,
            alignSelf: 'center',
            marginTop: height * 0.01,
          }}
        >
          <Text style={styles.attemptsText}>
            Intentos: {attempts} {isComplete ? '🎯' : '⚡'}
          </Text>
        </LinearGradient>
      )}

      {/* Modal de éxito con degradado morado HD */}
      {showSuccessModal && (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(26, 0, 51, 0.9)',
            zIndex: 999,
          }}>
          <LinearGradient
            colors={['#8B45FF', '#B844D8', '#58CCF7', '#8B45FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: width * 0.88,
              paddingVertical: height * 0.05,
              paddingHorizontal: width * 0.06,
              borderRadius: 24,
              alignItems: 'center',
              alignSelf: 'center',
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Efectos decorativos */}
            <Text style={{ position: 'absolute', top: height * 0.01, left: width * 0.05, fontSize: width * 0.04, opacity: 0.7 }}>✨</Text>
            <Text style={{ position: 'absolute', top: height * 0.02, right: width * 0.05, fontSize: width * 0.03, opacity: 0.6 }}>⭐</Text>
            <Text style={{ position: 'absolute', bottom: height * 0.01, left: width * 0.1, fontSize: width * 0.035, opacity: 0.5 }}>💫</Text>
            <Text style={{ position: 'absolute', bottom: height * 0.015, right: width * 0.08, fontSize: width * 0.04, opacity: 0.7 }}>🌟</Text>
            
            <Text style={{
              fontSize: width * 0.09,
              color: '#fff',
              fontWeight: '900',
              marginBottom: height * 0.02,
              textShadowColor: 'rgba(139, 69, 255, 0.8)',
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 12,
              letterSpacing: 1,
            }}>
              ¡Perfecto! 🎉
            </Text>
            <Text style={{
              fontSize: width * 0.048,
              color: '#fff',
              textAlign: 'center',
              marginBottom: height * 0.025,
              lineHeight: width * 0.065,
              fontWeight: '600',
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}>
              Has ordenado correctamente las etapas del proceso eléctrico.{'\n\n'}
              ⚡ Ahora conoces el viaje completo de la electricidad desde su generación hasta tu hogar.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccessModal(false);
                setTimeout(() => {
                  onComplete();
                }, 300);
              }}
            >
              <LinearGradient
                colors={['#58CCF7', '#8B45FF', '#B844D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingVertical: height * 0.018,
                  paddingHorizontal: width * 0.08,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  shadowColor: '#58CCF7',
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              >
                <Text style={{ 
                  color: '#fff', 
                  fontWeight: '800', 
                  fontSize: width * 0.048,
                  textShadowColor: 'rgba(0, 0, 0, 0.3)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                  letterSpacing: 0.5,
                }}>
                  Continuar ➡️
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </LinearGradient>
  );
}
