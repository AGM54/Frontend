import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface StorySlideData {
  id: number;
  title: string;
  image: any;
  description: string;
  buttonText?: string;
}

const storySlides: StorySlideData[] = [
  {
    id: 1,
    title: "Se va la luz",
    image: require('../../assets/julio11.png'),
    description: 'Diego está en su cuarto, se va la energía: "¡Nooo! Se fue la luz justo cuando iba a entregar mi tarea..."',
    buttonText: "Continuar"
  },
  {
    id: 2,
    title: "Llamada a la empresa",
    image: require('../../assets/historia2.png'),
    description: 'Diego llama a la empresa eléctrica para reportar la falla. Le dicen que ya están trabajando en solucionarlo.',
    buttonText: "Continuar"
  },
  {
    id: 3,
    title: "¿Qué hace la CNEE?",
    image: require('../../assets/historia3.png'),
    description: 'Mientras tanto, la CNEE supervisa que la empresa cumpla con los estándares de servicio y resuelva el problema rápidamente.',
    buttonText: "Continuar"
  },
  {
    id: 4,
    title: "Luz restaurada",
    image: require('../../assets/historia4.png'),
    description: 'La empresa repara la falla y Diego puede continuar con su tarea. La CNEE se asegura de que el servicio sea confiable.',
    buttonText: "Finalizar Historia"
  }
];

interface StorySlideProps {
  onComplete: () => void;
}

export default function StorySlide({ onComplete }: StorySlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = storySlides[currentSlide];
  const isLastSlide = currentSlide === storySlides.length - 1;

  const handleContinue = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.slideCounter}>
          Slide {currentSlide + 1} de {storySlides.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#2a2a4a', '#1e1e3a', '#151530']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.slideCard}
        >
          <Text style={styles.slideTitle}>{slide.title}</Text>

          <Image
            source={slide.image}
            style={styles.storyImage}
            resizeMode="cover"
          />

          <Text style={styles.descriptionText}>{slide.description}</Text>
        </LinearGradient>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={['#58CCF7', '#4A9FE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.continueButtonText}>
              {slide.buttonText || 'Continuar'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
