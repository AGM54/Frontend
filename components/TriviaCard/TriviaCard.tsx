import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface TriviaQuestion {
  id: number;
  question: string;
  correct: boolean;
  feedback: string;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿El precio de la energía eléctrica es fijado por la CNEE?",
    correct: true,
    feedback: "¡Correcto! La CNEE establece las tarifas eléctricas para garantizar precios justos y accesibles para todos los usuarios."
  },
  {
    id: 2,
    question: "¿Tu factura de electricidad depende únicamente del consumo de energía?",
    correct: false,
    feedback: "Incorrecto. Tu factura incluye varios conceptos además del consumo: cargo fijo, alumbrado público, tasas municipales, y otros cargos regulados."
  },
  {
    id: 3,
    question: "¿Puedes reportar errores en tu factura directamente a la empresa distribuidora?",
    correct: true,
    feedback: "¡Correcto! Puedes contactar directamente a tu empresa distribuidora para reportar errores, hacer reclamos o solicitar aclaraciones sobre tu factura."
  },
  {
    id: 4,
    question: "¿El cargo por alumbrado público es opcional en tu factura?",
    correct: false,
    feedback: "Incorrecto. El cargo por alumbrado público es obligatorio y contribuye al mantenimiento de la iluminación en calles y espacios públicos."
  },
  {
    id: 5,
    question: "¿La lectura del medidor determina tu consumo mensual?",
    correct: true,
    feedback: "¡Correcto! La diferencia entre la lectura actual y la anterior determina tu consumo mensual de energía eléctrica."
  },
  {
    id: 6,
    question: "¿Todas las tarifas eléctricas son iguales para todos los usuarios?",
    correct: false,
    feedback: "Incorrecto. Existen diferentes tarifas según el tipo de usuario: residencial, comercial, industrial, y según el nivel de consumo."
  },
  {
    id: 7,
    question: "¿La factura incluye información sobre tu historial de consumo?",
    correct: true,
    feedback: "¡Correcto! Tu factura muestra el historial de consumo de los últimos meses para que puedas comparar y monitorear tu uso de energía."
  },
  {
    id: 8,
    question: "¿Los impuestos y tasas municipales son fijados por la empresa eléctrica?",
    correct: false,
    feedback: "Incorrecto. Los impuestos y tasas municipales son establecidos por el gobierno y municipalidades, no por la empresa eléctrica."
  }
];

interface TriviaCardProps {
  onComplete: () => void;
}

export default function TriviaCard({ onComplete }: TriviaCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const question = triviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === triviaQuestions.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correct) {
      setScore(score + 1);
    }
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const isCorrect = selectedAnswer === question.correct;

  return (
    <LinearGradient
      colors={['#1a0033', '#2d1b4d', '#3d2b5f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.triviaContainer}
    >
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Pregunta {currentQuestion + 1} de {triviaQuestions.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{triviaQuestions.length}
        </Text>
      </View>

      <View
        style={[styles.scrollContainer, styles.scrollContent]}
      >
        <LinearGradient
          colors={['#4a3075', '#2d1b4d', '#1a0033']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.questionCard}
        >
          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.answersContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === true && (isCorrect ? styles.correctButton : styles.incorrectButton)
              ]}
              onPress={() => handleAnswer(true)}
              disabled={showFeedback}
            >
              <LinearGradient
                colors={
                  selectedAnswer === true 
                    ? (isCorrect ? ['#134e5e', '#71b280'] : ['#cb2d3e', '#ef473a'])
                    : ['#2c2c2c', '#1c1c1c']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
              >
                <Text style={[
                  styles.answerText,
                  selectedAnswer === true && styles.selectedAnswerText
                ]}>
                  ✅ Sí
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === false && (isCorrect ? styles.correctButton : styles.incorrectButton)
              ]}
              onPress={() => handleAnswer(false)}
              disabled={showFeedback}
            >
              <LinearGradient
                colors={
                  selectedAnswer === false 
                    ? (isCorrect ? ['#134e5e', '#71b280'] : ['#cb2d3e', '#ef473a'])
                    : ['#2c2c2c', '#1c1c1c']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}
              >
                <Text style={[
                  styles.answerText,
                  selectedAnswer === false && styles.selectedAnswerText
                ]}>
                  ❌ No
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {showFeedback && (
            <LinearGradient
              colors={
                isCorrect
                  ? ['#00b09b', '#96c93d'] // verde profesional para correcto
                  : ['#ff416c', '#ff4b2b'] // rojo profesional para incorrecto
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.feedbackContainer,
                { borderRadius: 18, borderWidth: 0, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, elevation: 6 }
              ]}
            >
              <Text style={[styles.feedbackTitle, { color: '#fff', textShadowColor: '#2d1b4d', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 }] }>
                {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😔'}
              </Text>
              <Text style={[styles.feedbackText, { color: '#fff', opacity: 0.95 }]}>{question.feedback}</Text>
            </LinearGradient>
          )}
        </LinearGradient>

        {showFeedback && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <LinearGradient
              colors={['#58CCF7', '#4A9FE7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
            >
              <Text style={styles.continueButtonText}>
                {isLastQuestion ? 'Finalizar Trivia' : 'Continuar'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
