import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface DiegoQuestion {
  id: number;
  question: string;
  options: { text: string; correct: boolean }[];
  feedback: { correct: string; incorrect: string };
}

const questions: DiegoQuestion[] = [
  {
    id: 1,
    question: '¿Qué hace la CNEE cuando se va la luz?',
    options: [
      { text: 'A) La ignora', correct: false },
      { text: 'B) Vigila que la empresa distribuidora resuelva rápido', correct: true },
      { text: 'C) Cobra más', correct: false },
    ],
    feedback: {
      correct: 'La CNEE supervisa el restablecimiento del servicio y vela porque la distribuidora atienda la falla con prontitud.',
      incorrect: 'La CNEE vigila que la empresa distribuida atienda y resuelva rápidamente los cortes; por eso la respuesta correcta es la B.'
    }
  },
  {
    id: 2,
    question: '¿La CNEE genera electricidad?',
    options: [
      { text: 'A) Sí', correct: false },
      { text: 'B) No, la CNEE regula el sector eléctrico.', correct: true },
      { text: 'C) Solo en fin de mes', correct: false },
    ],
    feedback: {
      correct: 'La CNEE no produce energía; su función es regular, normar y supervisar el sector eléctrico.',
      incorrect: 'La respuesta correcta es B: la CNEE regula el sector, pero no genera energía.'
    }
  },
  {
    id: 3,
    question: '¿Por qué volvió la luz a la casa de Diego?',
    options: [
      { text: 'A) Porque el vecino la arregló', correct: false },
      { text: 'B) Porque la empresa hizo bien su trabajo', correct: true },
      { text: 'C) Porque Diego reinició su router', correct: false },
    ],
    feedback: {
      correct: 'La distribuidora identificó y solucionó la falla, por eso el servicio fue restablecido.',
      incorrect: 'La respuesta correcta es B: la empresa distribuidora resolvió la falla y devolvió el servicio.'
    }
  }
];

interface Props {
  onComplete: () => void;
}

export default function DiegoTrivia({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  const handleAnswer = (index: number) => {
    setSelected(index);
    setShowFeedback(true);
    if (q.options[index].correct) setScore(prev => prev + 1);
  };

  useEffect(() => {
    if (showFeedback && scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 250);
    }
  }, [showFeedback]);

  const handleContinue = () => {
    if (isLast) return onComplete();
    setCurrent(current + 1);
    setSelected(null);
    setShowFeedback(false);
  };

  const isCorrect = selected !== null && q.options[selected].correct;

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.triviaContainer}
    >
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>Pregunta {current + 1} de {questions.length}</Text>
        <Text style={styles.scoreText}>Puntuación: {score}/{questions.length}</Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={['#2a2a4a', '#1e1e3a', '#151530']} style={styles.questionCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.questionText}>{q.question}</Text>

          <View style={styles.multipleChoiceContainer}>
            {q.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleAnswer(i)}
                disabled={showFeedback}
                style={[styles.multipleChoiceButton, selected === i && (opt.correct ? styles.correctButton : styles.incorrectButton)]}
              >
                <LinearGradient
                  colors={selected === i && showFeedback ? (opt.correct ? ['#28A745', '#20C751'] : ['#DC3545', '#FF4757']) : (showFeedback && opt.correct ? ['#28A745', '#20C751'] : ['#2c2c2c', '#1c1c1c'])}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1, justifyContent: 'center', paddingVertical: height * 0.02, paddingHorizontal: width * 0.04, borderRadius: 12 }}
                >
                  <Text style={[styles.multipleChoiceText, (selected === i || (showFeedback && opt.correct)) && styles.selectedAnswerText]}>{opt.text}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {showFeedback && (
            <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
              <Text style={styles.feedbackTitle}>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</Text>
              <Text style={styles.feedbackText}>{isCorrect ? q.feedback.correct : q.feedback.incorrect}</Text>
            </View>
          )}
        </LinearGradient>

        {showFeedback && (
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <LinearGradient colors={['#58CCF7', '#4A9FE7']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
              <Text style={styles.continueButtonText}>{isLast ? 'Finalizar Trivia' : 'Continuar'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
