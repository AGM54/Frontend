import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { styles } from './styles';
import { Confetti } from './Confetti';

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
  const [showConfetti, setShowConfetti] = useState(false);

  const question = triviaQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === triviaQuestions.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === question.correct) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowConfetti(false);
    }
  };

  const isCorrect = selectedAnswer === question.correct;

  return (
    <View style={styles.triviaContainer}>
      {showConfetti && <Confetti />}
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Pregunta {currentQuestion + 1} de {triviaQuestions.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{triviaQuestions.length}
        </Text>
      </View>

      <View style={styles.questionCard}>
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
          {isLastQuestion ? 'Finalizar Trivia' : 'Continuar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}