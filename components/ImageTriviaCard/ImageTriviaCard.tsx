import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface ImageTriviaQuestion {
  id: number;
  situation: string;
  image: any;
  correct: boolean;
  feedback: string;
}

const imageTriviaQuestions: ImageTriviaQuestion[] = [
  {
    id: 1,
    situation: "Se fue la luz y la distribuidora repara el problema",
    image: require('../../assets/sefue.png'),
    correct: true,
    feedback: "Sí, aunque es responsabilidad de la distribuidora. La CNEE supervisa."
  },
  {
    id: 2,
    situation: "Recibo correcto de luz",
    image: require('../../assets/recibo.png'),
    correct: true,
    feedback: "Sí, aunque es responsabilidad de la distribuidora. La CNEE supervisa."
  },
  {
    id: 3,
    situation: "Electricista instala un foco en casa",
    image: require('../../assets/electricista.png'),
    correct: false,
    feedback: "No es responsabilidad de la CNEE."
  },
  {
    id: 4,
    situation: "Empresa sube tarifas sin razón",
    image: require('../../assets/sinrazon.png'),
    correct: true,
    feedback: "Sí, no lo puede hacer. En estos casos la CNEE interviene."
  },
  {
    id: 5,
    situation: "Vecino reclama por mal servicio",
    image: require('../../assets/vecino.png'),
    correct: true,
    feedback: "Aunque es responsabilidad de la distribuidora, la CNEE supervisa."
  }
];

interface ImageTriviaCardProps {
  onComplete: () => void;
}

export default function ImageTriviaCard({ onComplete }: ImageTriviaCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const question = imageTriviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === imageTriviaQuestions.length - 1;

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
      }, 300); // Pequeño delay para asegurar que el feedback se renderice
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
      colors={['#1a0033', '#2d1b4d', '#3d2b5f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.triviaContainer}
    >
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Situación {currentQuestion + 1} de {imageTriviaQuestions.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{imageTriviaQuestions.length}
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
          colors={['#2d1b4d', '#3d2b5f', '#8B45FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.questionCard}
        >
          {currentQuestion === 0 && (
            <Text style={styles.activityTitle}>
              Actividad: Relaciona cada situación y decide si es regulada o no por la CNEE
            </Text>
          )}

          <LinearGradient
            colors={['rgba(139, 69, 255, 0.15)', 'rgba(139, 69, 255, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.imageContainer}
          >
            <Image
              source={question.image}
              style={styles.situationImage}
              resizeMode="contain"
            />
          </LinearGradient>

          <Text style={styles.situationText}>{question.situation}</Text>

          <Text style={styles.questionText}>
            ¿Esta situación es regulada por la CNEE?
          </Text>

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
                    : ['#3d2b5f', '#2d1b4d']
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

        {/* Botón fuera del LinearGradient de la pregunta para mejor accesibilidad */}
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
                {isLastQuestion ? 'Finalizar Actividad' : 'Continuar'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
