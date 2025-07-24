import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Option = {
  label: string;
  correct: boolean;
};

type Props = {
  question: string;
  options: Option[];
  image?: any;
  onNext?: () => void;
  explanation?: string;
};

export default function TriviaCard({ question, options, image, onNext, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correctAnswered, setCorrectAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (correctAnswered) return;
    const isCorrect = options[index].correct;
    setSelected(index);
    if (isCorrect) {
      setCorrectAnswered(true);
    }
  };

  return (
    <View style={styles.card}>
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.question}>{question}</Text>

      {options.map((opt, i) => {
        const isSelected = selected === i;
        const isCorrect = opt.correct;
        const showFeedback = isSelected;

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.option,
              showFeedback && {
                backgroundColor: isCorrect ? '#C8E6C9' : '#FFCDD2',
                borderColor: isCorrect ? '#00C853' : '#D32F2F',
              },
            ]}
            onPress={() => handleSelect(i)}
          >
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}

      {correctAnswered && explanation && (
        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>✅ Correcto</Text>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>
      )}

      {correctAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  image: {
    width: width * 0.4,
    height: height * 0.18,
    marginBottom: 20,
  },
  question: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#003366',
    textAlign: 'center',
  },
  option: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF7A00',
    marginBottom: 10,
  },
  optionText: {
    fontSize: width * 0.04,
    color: '#003366',
    textAlign: 'center',
  },
  explanationBox: {
    backgroundColor: '#d4edda',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    width: '100%',
  },
  explanationTitle: {
    fontWeight: 'bold',
    color: '#155724',
    fontSize: width * 0.04,
    marginBottom: 4,
    textAlign: 'center',
  },
  explanationText: {
    color: '#155724',
    fontSize: width * 0.038,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#00C853',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
