import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Option {
  label: string;
  correct: boolean;
  image: any;
  isLarger?: boolean;
}

interface Props {
  question: string;
  options: Option[];
  onNext: () => void;
}

const ImageTriviaCard: React.FC<Props> = ({ question, options, onNext }) => {
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🔄 Resetear estados al cambiar de pregunta
  useEffect(() => {
    setFeedback(null);
    setRespuestaCorrecta(false);
    fadeAnim.setValue(0);
  }, [question]);

  const mostrarFeedback = (tipo: 'correct' | 'wrong') => {
    setFeedback(tipo);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (isCorrect: boolean) => {
    if (respuestaCorrecta) return;

    if (isCorrect) {
      setRespuestaCorrecta(true);
      mostrarFeedback('correct');
    } else {
      mostrarFeedback('wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(opt.correct)}
            style={[
              styles.optionBox,
              respuestaCorrecta && opt.correct && { borderColor: '#00C853', borderWidth: 2 },
            ]}
            disabled={respuestaCorrecta}
          >
            <Image
              source={opt.image}
              style={[
                styles.optionImage,
                opt.isLarger && styles.largerImage,
              ]}
            />
            <Text style={styles.optionLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {feedback && (
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              opacity: fadeAnim,
              backgroundColor: feedback === 'correct' ? '#00C853' : '#FF5252',
            },
          ]}
        >
          <Text style={styles.feedbackText}>
            {feedback === 'correct' ? '¡Correcto! 🎉' : 'Intenta de nuevo 🙁'}
          </Text>
        </Animated.View>
      )}

      {respuestaCorrecta && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageTriviaCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  optionBox: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    width: width * 0.42,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionImage: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
  largerImage: {
    width: width * 0.36,
    height: width * 0.36,
  },
  optionLabel: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  feedbackContainer: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 10,
    backgroundColor: '#FF7A00',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
