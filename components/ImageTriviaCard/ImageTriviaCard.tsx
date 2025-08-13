import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
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

  const question = imageTriviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === imageTriviaQuestions.length - 1;

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
    <View style={styles.triviaContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Situación {currentQuestion + 1} de {imageTriviaQuestions.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{imageTriviaQuestions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.questionCard}>
          {currentQuestion === 0 && (
            <Text style={styles.activityTitle}>
              Actividad: Relaciona cada situación y decide si es regulada o no por la CNEE
            </Text>
          )}

          <View style={styles.imageContainer}>
            <Image
              source={question.image}
              style={styles.situationImage}
              resizeMode="contain"
            />
          </View>

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
              <Text style={[
                styles.answerText,
                selectedAnswer === true && styles.selectedAnswerText
              ]}>
                ✅ Sí
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === false && (isCorrect ? styles.correctButton : styles.incorrectButton)
              ]}
              onPress={() => handleAnswer(false)}
              disabled={showFeedback}
            >
              <Text style={[
                styles.answerText,
                selectedAnswer === false && styles.selectedAnswerText
              ]}>
                ❌ No
              </Text>
            </TouchableOpacity>
          </View>

          {showFeedback && (
            <View style={[
              styles.feedbackContainer,
              isCorrect ? styles.correctFeedback : styles.incorrectFeedback
            ]}>
              <Text style={styles.feedbackTitle}>
                {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😔'}
              </Text>
              <Text style={styles.feedbackText}>{question.feedback}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !showFeedback && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!showFeedback}
        >
          <Text style={[
            styles.continueButtonText,
            !showFeedback && styles.disabledButtonText
          ]}>
            {isLastQuestion ? 'Finalizar Actividad' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
