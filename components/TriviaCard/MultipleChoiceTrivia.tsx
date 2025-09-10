import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface TriviaOption {
  id: string;
  text: string;
  correct: boolean;
}

interface MultipleChoiceTriviaProps {
  question: string;
  options: TriviaOption[];
  explanation: string;
  onComplete: () => void;
}

export default function MultipleChoiceTrivia({ 
  question, 
  options, 
  explanation, 
  onComplete 
}: MultipleChoiceTriviaProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  const selectedOption = options.find(opt => opt.id === selectedAnswer);
  const isCorrect = selectedOption?.correct || false;

  return (
    <LinearGradient
      colors={['#1a0033', '#2d1b4d', '#3d2b5f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        minHeight: height * 0.7,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
      }}
    >
      <LinearGradient
        colors={['#4a3075', '#2d1b4d', '#1a0033']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          padding: width * 0.06,
          marginVertical: height * 0.02,
          borderWidth: 2,
          borderColor: 'rgba(88, 204, 247, 0.3)',
        }}
      >
        <Text style={{
          fontSize: width * 0.055,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: height * 0.025,
          lineHeight: width * 0.07,
        }}>
          🎮 Mini quiz interactivo
        </Text>

        <Text style={{
          fontSize: width * 0.045,
          color: '#E0E0E0',
          marginBottom: height * 0.03,
          lineHeight: width * 0.06,
          textAlign: 'left',
        }}>
          {question}
        </Text>

        <View style={{ marginBottom: height * 0.02 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={{
                marginBottom: height * 0.015,
              }}
              onPress={() => handleAnswer(option.id)}
              disabled={showFeedback}
            >
              <LinearGradient
                colors={
                  selectedAnswer === option.id
                    ? (isCorrect && option.correct ? ['#134e5e', '#71b280'] : ['#cb2d3e', '#ef473a'])
                    : showFeedback && option.correct
                    ? ['#134e5e', '#71b280']
                    : ['#2c2c2c', '#1c1c1c']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 12,
                  padding: width * 0.04,
                  borderWidth: 1,
                  borderColor: selectedAnswer === option.id ? '#58CCF7' : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text style={{
                  fontSize: width * 0.04,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {option.text}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {showFeedback && (
          <LinearGradient
            colors={
              isCorrect
                ? ['#00b09b', '#96c93d']
                : ['#ff416c', '#ff4b2b']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 18,
              padding: width * 0.04,
              marginBottom: height * 0.02,
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{
              fontSize: width * 0.045,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: height * 0.01,
              textShadowColor: '#2d1b4d',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 6,
            }}>
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </Text>
            <Text style={{
              fontSize: width * 0.038,
              color: '#fff',
              opacity: 0.95,
              textAlign: 'center',
              lineHeight: width * 0.05,
            }}>
              {explanation}
            </Text>
          </LinearGradient>
        )}

        {showFeedback && (
          <TouchableOpacity
            style={{
              marginTop: height * 0.02,
            }}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={['#58CCF7', '#4A9FE7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 16,
                padding: width * 0.04,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: width * 0.045,
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}>
                Continuar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </LinearGradient>
  );
}
