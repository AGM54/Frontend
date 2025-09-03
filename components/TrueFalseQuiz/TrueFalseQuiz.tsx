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
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string | { correct: string; incorrect: string };
}

const defaultQuestions: Question[] = [
  {
    question: 'La CNEE instala los cables de energía en tu colonia.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'La CNEE supervisa, pero son las empresas distribuidoras quienes instalan los cables.'
  },
  {
    question: 'La CNEE supervisa que el servicio eléctrico sea de calidad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: '¡Correcto! La CNEE vigila que las empresas brinden un servicio de calidad.'
  },
  {
    question: 'Tú pagas según lo que marca el medidor.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: '¡Exacto! Solo pagas por la electricidad que realmente consumes.'
  }
];

interface Props {
  onComplete: () => void;
  questions?: Question[];
}

export default function TrueFalseQuiz({ onComplete, questions = defaultQuestions }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Función para limpiar emojis de las opciones
  const cleanOption = (option: string) => {
    // Elimina emojis comunes y espacios al inicio
    return option.replace(/[\u2705\u274C\u2728\u2B50\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '').trim();
  };

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answerIndex);
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

      {/* Botones de respuesta */}
      <View style={styles.answersContainer}>
        {current.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index && styles.selectedButton
            ]}
            onPress={() => handleAnswer(index)}
            disabled={showFeedback}
          >
            <LinearGradient
              colors={selectedAnswer === index ? ['#28A745', '#34CE57'] : ['#1E1B4B', '#3730A3', '#5B21B6', '#7C3AED']}
              style={styles.answerButtonGradient}
            >
              <Text style={styles.answerButtonText}>
                {cleanOption(option)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Score */}
      <Text style={styles.scoreText}>Puntuación: {score}/{questions.length}</Text>

      {/* Modal de Feedback */}
      <Modal transparent visible={showFeedback} animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={isCorrect
              ? ['#43e97b', '#38f9d7', '#28a745', '#218838', '#14532d'] // degradado verde profesional
              : ['#ff5858', '#f857a6', '#e53935', '#b71c1c', '#7f1d1d'] // degradado rojo profesional
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.feedbackModal, { borderWidth: 2, borderColor: isCorrect ? '#43e97b' : '#e53935', shadowColor: isCorrect ? '#43e97b' : '#e53935', shadowOpacity: 0.25, shadowRadius: 16 }]}
          >
            <Text style={[styles.feedbackTitle, isCorrect && { textShadowColor: '#43e97b', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 12 }]}> 
              {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto'}
            </Text>
            <Text style={styles.feedbackMessage}>
              {isCorrect ? (
                typeof current.explanation === 'object'
                  ? current.explanation.correct
                  : current.explanation || '¡Muy bien!'
              ) : (
                typeof current.explanation === 'object'
                  ? 'Es incorrecto porque ' + current.explanation.incorrect.toLowerCase() + '\n\nLa opción correcta es: ' + current.options[current.correctAnswer]
                  : 'Es incorrecto porque ' + (current.explanation || 'esta no es la respuesta adecuada').toLowerCase() + '\n\nLa opción correcta es: ' + current.options[current.correctAnswer]
              )}
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <LinearGradient
                colors={isCorrect ? ['#43e97b', '#38f9d7'] : ['#e53935', '#ff5858']}
                style={[styles.nextButtonGradient, { borderWidth: 2, borderColor: isCorrect ? '#43e97b' : '#e53935', shadowColor: isCorrect ? '#43e97b' : '#e53935', shadowOpacity: 0.18, shadowRadius: 8 }]}
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
