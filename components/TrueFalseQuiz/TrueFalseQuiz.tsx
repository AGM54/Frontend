import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface Question {
  id: number;
  question: string;
  correctAnswer: boolean;
  explanation?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'La CNEE instala los cables de energía en tu colonia.',
    correctAnswer: false,
    explanation: 'La CNEE supervisa, pero son las empresas distribuidoras quienes instalan los cables.'
  },
  {
    id: 2,
    question: 'La CNEE supervisa que el servicio eléctrico sea de calidad.',
    correctAnswer: true,
    explanation: '¡Correcto! La CNEE vigila que las empresas brinden un servicio de calidad.'
  },
  {
    id: 3,
    question: 'Tú pagas según lo que marca el medidor.',
    correctAnswer: true,
    explanation: '¡Exacto! Solo pagas por la electricidad que realmente consumes.'
  }
];

interface Props {
  onComplete: () => void;
}

export default function TrueFalseQuiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const correct = answer === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Pregunta {currentQuestion + 1} de {questions.length}</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#58CCF7', '#60A5FA', '#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.progressFill,
              { width: `${progress}%` }
            ]}
          />
        </View>
      </View>

      {/* Pregunta */}
      <LinearGradient
        colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.questionCard}
      >
        <Text style={styles.questionText}>{current.question}</Text>
      </LinearGradient>

      {/* Botones Verdadero/Falso */}
      <View style={styles.answersContainer}>
        <TouchableOpacity
          style={[
            styles.answerButton,
            selectedAnswer === true && styles.selectedButton
          ]}
          onPress={() => handleAnswer(true)}
          disabled={showFeedback}
        >
          <LinearGradient
            colors={selectedAnswer === true ? ['#28A745', '#34CE57'] : ['#1E1B4B', '#3730A3', '#5B21B6', '#7C3AED']}
            style={styles.answerButtonGradient}
          >
            <Text style={styles.answerButtonText}>✅ VERDADERO</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.answerButton,
            selectedAnswer === false && styles.selectedButton
          ]}
          onPress={() => handleAnswer(false)}
          disabled={showFeedback}
        >
          <LinearGradient
            colors={selectedAnswer === false ? ['#DC3545', '#E74C3C'] : ['#312E81', '#4338CA', '#6366F1', '#8B5CF6']}
            style={styles.answerButtonGradient}
          >
            <Text style={styles.answerButtonText}>❌ FALSO</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Score */}
      <Text style={styles.scoreText}>Puntuación: {score}/{questions.length}</Text>

      {/* Modal de Feedback */}
      <Modal transparent visible={showFeedback} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={isCorrect ? 
              ['#1a0033', '#2d1b4d', '#28A745', '#34CE57', '#2d1b4d', '#1a0033'] :
              ['#1a0033', '#2d1b4d', '#DC3545', '#E74C3C', '#2d1b4d', '#1a0033']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.feedbackModal}
          >
            <Text style={styles.feedbackTitle}>
              {isCorrect ? '¡Correcto! 🎉' : '¡Inténtalo de nuevo! 💪'}
            </Text>
            <Text style={styles.feedbackMessage}>
              {current.explanation}
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Mensaje de Completado */}
      {quizComplete && (
        <View style={styles.completionOverlay}>
          <LinearGradient
            colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
            style={styles.completionCard}
          >
            <Text style={styles.completionTitle}>¡Quiz Completado! 🌟</Text>
            <Text style={styles.completionScore}>
              Puntuación Final: {score}/{questions.length}
            </Text>
            <Text style={styles.completionMessage}>
              {score === questions.length ? 
                '¡Excelente! Dominas el tema perfectamente.' :
                score >= 2 ? 
                '¡Muy bien! Has aprendido mucho.' :
                '¡Buen intento! Sigue practicando.'
              }
            </Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}
