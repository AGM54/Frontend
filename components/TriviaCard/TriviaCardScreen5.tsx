import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
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
    question: "¿Quién fija las tarifas eléctricas en Guatemala para los usuarios residenciales?",
    options: [
      { text: "A) El Congreso", correct: false },
      { text: "B) La CNEE", correct: true },
      { text: "C) Las empresas", correct: false }
    ],
    feedback: {
      correct: "La CNEE fija las tarifas eléctricas.",
      incorrect: "Correcto: B) La CNEE."
    }
  },
  {
    id: 2,
    question: "¿Qué hace la CNEE si una empresa eléctrica comete una falta?",
    options: [
      { text: "A) La ignora", correct: false },
      { text: "B) La supervisa y le puede sancionar", correct: true },
      { text: "C) Le da un premio", correct: false }
    ],
    feedback: {
      correct: "La CNEE supervisa y sanciona empresas.",
      incorrect: "Correcto: B) La supervisa y sanciona."
    }
  },
  {
    id: 3,
    question: "¿La CNEE genera energía?",
    options: [
      { text: "A) Sí", correct: false },
      { text: "B) No, solo regula el sector eléctrico", correct: true },
      { text: "C) Solo en la capital", correct: false }
    ],
    feedback: {
      correct: "La CNEE solo regula, no genera energía.",
      incorrect: "Correcto: B) No, solo regula."
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

  const question = triviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === triviaQuestions.length - 1;

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    if (question.options[optionIndex].correct) {
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

  const isCorrect = selectedAnswer !== null && question.options[selectedAnswer].correct;

  return (
    <View style={styles.triviaContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Pregunta {currentQuestion + 1} de {triviaQuestions.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{triviaQuestions.length}
        </Text>
      </View>

      <View style={[
        styles.questionCard,
        showFeedback && styles.questionCardWithFeedback
      ]}>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={[
          styles.multipleChoiceContainer,
          showFeedback && styles.multipleChoiceContainerWithFeedback
        ]}>
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
              <Text style={[
                styles.multipleChoiceText,
                selectedAnswer === index && styles.selectedAnswerText,
                showFeedback && option.correct && styles.selectedAnswerText
              ]}>
                {option.text}
              </Text>
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
          {isLastQuestion ? 'Finalizar Trivia' : 'Continuar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}