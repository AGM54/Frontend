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
    question: '¿La CNEE genera electricidad en Guatemala?',
    correct: false,
    feedback: 'No; la CNEE no produce energía. Su función es regular y supervisar el sector eléctrico.'
  },
  {
    id: 2,
    question: '¿La CNEE se encarga de que la energía que recibimos sea de calidad y sin cortes?',
    correct: true,
    feedback: 'Sí; la CNEE supervisa la calidad del servicio para que llegue con la potencia adecuada y menor cantidad de fallas.'
  },
  {
    id: 3,
    question: '¿La CNEE aplica la Ley General de Electricidad en el país?',
    correct: true,
    feedback: 'Sí; la CNEE implementa y supervisa el cumplimiento de la normativa eléctrica, incluida la Ley General de Electricidad.'
  },
  {
    id: 4,
    question: '¿La CNEE protege los derechos de los usuarios de energía eléctrica?',
    correct: true,
    feedback: 'Sí; protege derechos de los usuarios y vela por un servicio justo y transparente.'
  },
  {
    id: 5,
    question: '¿La CNEE vigila que las empresas del sector eléctrico actúen correctamente?',
    correct: true,
    feedback: 'Sí; supervisa a las empresas para garantizar que cumplan normas técnicas y de atención al usuario.'
  },
  {
    id: 6,
    question: '¿La CNEE decide cuánto pueden cobrar las distribuidoras por llevar la energía a los hogares?',
    correct: true,
    feedback: 'Sí; una de sus funciones es regular y autorizar tarifas para las distribuidoras.'
  },
  {
    id: 7,
    question: '¿La CNEE resuelve conflictos entre empresas del sector eléctrico?',
    correct: true,
    feedback: 'Sí; la CNEE puede intervenir en reclamos y disputas del sector para asegurar cumplimiento de la normativa.'
  },
  {
    id: 8,
    question: '¿La CNEE establece normas y permite el uso de las redes eléctricas?',
    correct: true,
    feedback: 'Sí; establece normas técnicas y facilita el uso y acceso a las redes eléctricas.'
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
                  Sí
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
                  No
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {showFeedback && (
            <LinearGradient
              colors={isCorrect ? ['#28A745', '#28A745'] : ['#DC3545', '#DC3545']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.feedbackContainer,
                isCorrect ? styles.correctFeedback : styles.incorrectFeedback
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {isCorrect ? 'CORRECTO' : 'INCORRECTO'}
              </Text>
              <Text style={styles.feedbackText}>{question.feedback.replace(/^\s*(CORRECTO:|INCORRECTO:|Correcto:?|Incorrecto:?|¡Correcto!?)/i, '').trim()}</Text>
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
