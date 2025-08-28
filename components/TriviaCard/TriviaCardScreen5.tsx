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
  options: {
    text: string;
    correct: boolean;
  }[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿Qué aprendió Sonia de su experiencia con la factura eléctrica?",
    options: [
      { text: "A) Que debe pagar sin revisar", correct: false },
      { text: "B) Puedo exigir a mi empresa distribuidora un servicio de energía de calidad, seguro y confiable", correct: true },
      { text: "C) Que nunca debe llamar a la empresa", correct: false }
    ],
    feedback: {
      correct: "¡Exacto! Sonia aprendió que puede exigir un servicio de calidad y sus derechos como usuaria.",
      incorrect: "Correcto: B) Sonia aprendió que puede exigir un servicio de energía de calidad, seguro y confiable."
    }
  }
];

interface TriviaCardScreen5Props {
  onComplete: () => void;
}

export default function TriviaCardScreen5({ onComplete }: TriviaCardScreen5Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const question = triviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === triviaQuestions.length - 1;

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    if (question.options[optionIndex].correct) {
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

  const isCorrect = selectedAnswer !== null && question.options[selectedAnswer].correct;

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

          <View style={styles.multipleChoiceContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.multipleChoiceButton,
                  selectedAnswer === index && (
                    option.correct ? styles.correctButton : styles.incorrectButton
                  ),
                  showFeedback && option.correct && styles.correctButton
                ]}
                onPress={() => handleAnswer(index)}
                disabled={showFeedback}
              >
                <LinearGradient
                  colors={
                    selectedAnswer === index && showFeedback
                      ? (option.correct ? ['#28A745', '#20C751'] : ['#DC3545', '#FF4757'])
                      : showFeedback && option.correct
                      ? ['#28A745', '#20C751']
                      : ['#2c2c2c', '#1c1c1c']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1, justifyContent: 'center', paddingVertical: height * 0.02, paddingHorizontal: width * 0.04, borderRadius: 12 }}
                >
                  <Text style={[
                    styles.multipleChoiceText,
                    (selectedAnswer === index || (showFeedback && option.correct)) && styles.selectedAnswerText
                  ]}>
                    {option.text}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {showFeedback && (
            <View style={[
              styles.feedbackContainer,
              isCorrect ? styles.correctFeedback : styles.incorrectFeedback
            ]}>
              <Text style={styles.feedbackTitle}>
                {isCorrect ? '¡Correcto! 🎉' : '❌ Incorrecto'}
              </Text>
              <Text style={styles.feedbackText}>
                {isCorrect ? question.feedback.correct : question.feedback.incorrect}
              </Text>
            </View>
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
