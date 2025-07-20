import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import styles from './generacionStyles';
import TriviaCard from '../../../components/TriviaCard';

const { width, height } = Dimensions.get('window');

const lessonSteps = [
  {
    title: '¿Qué es la generación de electricidad?',
    description:
      'Es el proceso de producir electricidad usando fuentes como el sol, el viento o el agua. Los electrones se mueven por un conductor cuando hay una diferencia de voltaje, creando un flujo de corriente como un río de energía.',
    image: require('../../assets/flujo.png'),
  },
  {
    title: '¿Qué fuentes existen?',
    description:
      'Existen fuentes renovables como la solar y la eólica, y no renovables como el petróleo y el gas. Las plantas generadoras convierten estas fuentes en energía eléctrica.',
  },
  {
    title: '🧠 Trivia: ¿Cuál es una fuente renovable?',
    isTrivia: true,
  },
  {
    title: '⚡ Juego interactivo (próximamente)',
    description: 'Aquí habrá un juego sobre cómo se genera y transporta la electricidad.',
  },
];

export default function GeneracionScreen() {
  const [step, setStep] = useState(0);
  const progress = (step + 1) / lessonSteps.length;
  const current = lessonSteps[step];

  const handleNext = () => {
    if (step < lessonSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    alert('¡Has terminado la lección de generación! ⚡');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>{current.title}</Text>

      {current.isTrivia ? (
        <TriviaCard
          question="¿Cuál es una fuente de energía renovable?"
          options={[
            { label: 'Carbón', correct: false },
            { label: 'Sol', correct: true },
            { label: 'Petróleo', correct: false },
            { label: 'Gas natural', correct: false },
          ]}
          onNext={handleNext}
        />
      ) : (
        <>
          {current.image && <Image source={current.image} style={styles.image} />}
          <Text style={styles.description}>{current.description}</Text>
        </>
      )}

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.stepIndicators}>
        {lessonSteps.map((_, i) => (
          <View
            key={i}
            style={[
              styles.circle,
              { backgroundColor: i === step ? '#FF7A00' : '#ccc' },
            ]}
          />
        ))}
      </View>

      {!current.isTrivia && step < lessonSteps.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      )}

      {step === lessonSteps.length - 1 && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00C853' }]}
          onPress={handleFinish}
        >
          <Text style={styles.buttonText}>Finalizar lección</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
