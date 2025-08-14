import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
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
    question: "Define el precio de la energía para usuarios residenciales",
    correct: true,
    feedback: "¡Correcto! La CNEE establece las tarifas eléctricas justas para garantizar un servicio de calidad a precios accesibles."
  },
  {
    id: 2,
    question: "Genera electricidad desde plantas solares",
    correct: false,
    feedback: "Incorrecto. La CNEE no genera electricidad, sino que regula el sector eléctrico de Guatemala."
  },
  {
    id: 3,
    question: "Supervisa que las empresas del sector eléctrico cumplan las normas",
    correct: true,
    feedback: "¡Correcto! La CNEE vigila que las empresas del sector eléctrico actúen correctamente."
  },
  {
    id: 4,
    question: "Cobra directamente el recibo de la luz",
    correct: false,
    feedback: "Incorrecto. La CNEE no cobra recibos directamente, eso lo hacen las empresas distribuidoras."
  },
  {
    id: 5,
    question: "Resuelve disputas entre empresas del sector",
    correct: true,
    feedback: "¡Correcto! La CNEE ayuda a resolver desacuerdos entre empresas del sector eléctrico."
  },
  {
    id: 6,
    question: "Instala cables eléctricos en las casas",
    correct: false,
    feedback: "Incorrecto. La CNEE no instala cables, eso lo hacen las empresas distribuidoras y técnicos especializados."
  },
  {
    id: 7,
    question: "Protege los derechos de los consumidores",
    correct: true,
    feedback: "¡Correcto! La CNEE defiende los derechos de los consumidores de energía eléctrica."
  },
  {
    id: 8,
    question: "Define normas técnicas sobre cómo debe funcionar la red eléctrica",
    correct: true,
    feedback: "¡Correcto! La CNEE establece reglas técnicas que deben cumplirse en el sector eléctrico."
  },
  {
    id: 9,
    question: "Se financia con impuestos del Estado",
    correct: false,
    feedback: "Incorrecto. La CNEE se financia principalmente con contribuciones del sector eléctrico, no con impuestos generales."
  },
  {
    id: 10,
    question: "Permite el uso de redes de energía a empresas autorizadas",
    correct: true,
    feedback: "¡Correcto! La CNEE permite el uso de redes para utilizar las redes de energía a empresas autorizadas."
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
  const scrollViewRef = useRef<ScrollView>(null);

  const question = triviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === triviaQuestions.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correct) {
      setScore(score + 1);
    }
  };

  // Scroll automático cuando aparece el feedback
  useEffect(() => {
    if (showFeedback && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [showFeedback]);

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
      colors={['#1a1a2e', '#16213e', '#0f3460']}
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

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
        alwaysBounceVertical={true}
      >
        <LinearGradient
          colors={['#2a2a4a', '#1e1e3a', '#151530']}
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
                    ? (isCorrect ? ['#28A745', '#20C751'] : ['#DC3545', '#FF4757'])
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
                    ? (isCorrect ? ['#28A745', '#20C751'] : ['#DC3545', '#FF4757'])
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
                  ? ['rgba(40, 167, 69, 0.3)', 'rgba(32, 199, 81, 0.2)']
                  : ['rgba(220, 53, 69, 0.3)', 'rgba(255, 71, 87, 0.2)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.feedbackContainer,
                isCorrect ? styles.correctFeedback : styles.incorrectFeedback
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😔'}
              </Text>
              <Text style={styles.feedbackText}>{question.feedback}</Text>
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
      </ScrollView>
    </LinearGradient>
  );
}
