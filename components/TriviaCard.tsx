import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Option = {
  label: string;
  correct: boolean;
};

type Props = {
  question: string;
  options: Option[];
  onNext?: () => void;
};

export default function TriviaCard({ question, options, onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (!answered) {
      setSelected(index);
      setAnswered(true);
      setTimeout(() => {
        onNext?.();
        setSelected(null);
        setAnswered(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {options.map((opt, i) => {
        const isSelected = selected === i;
        const isCorrect = opt.correct;
        const showFeedback = answered && isSelected;

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
  },
  question: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#003366',
  },
  option: {
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
  },
});