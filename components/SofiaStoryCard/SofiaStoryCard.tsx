import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface StorySlide {
  image: any;
  title: string;
  dialogue: string;
}

interface SofiaStoryCardProps {
  onComplete: () => void;
}

const sofiaStorySlides: StorySlide[] = [
  {
    image: require('../../assets/primeram.png'),
    title: 'Sofía en su primer apartamento',
    dialogue: '¡Mi primer hogar sola! Pero… ¿Cómo llega la luz hasta aquí?',
  },
  {
    image: require('../../assets/segundam.png'),
    title: 'Su papá le explica por teléfono',
    dialogue: 'La energía se genera lejos, viaja por cables, y llega gracias a la empresa distribuidora. La CNEE vigila que todo funcione bien.',
  },
  {
    image: require('../../assets/terceram.png'),
    title: 'Sofía revisa su medidor y el recibo',
    dialogue: 'Solo pago lo que consumo… y ahora entiendo por qué.',
  },
  {
    image: require('../../assets/cuartam.png'),
    title: 'Cierre',
    dialogue: '¡Gracias CNEE, ahora sé cómo funciona mi energía!',
  },
];

export default function SofiaStoryCard({ onComplete }: SofiaStoryCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (currentSlide < sofiaStorySlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = sofiaStorySlides[currentSlide];
  
  return (
    <View style={styles.container}>
      <Text style={styles.storyTitle}>🎞️ Historia de Sofía</Text>
      <Text style={styles.slideNumber}>Viñeta {currentSlide + 1} de {sofiaStorySlides.length}</Text>
      
      <LinearGradient
        colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#8B45FF', '#2d1b4d', '#1a0033']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.slideCard}
      >
        <Text style={styles.slideTitle}>{slide.title}</Text>
        
        {/* Comic Frame - Solo imagen grande */}
        <View style={styles.comicFrame}>
          <Image
            source={slide.image}
            style={styles.comicImageLarge}
            resizeMode="contain"
          />
        </View>
        
        <TouchableOpacity style={styles.nextSlideButton} onPress={handleNextSlide}>
          <LinearGradient
            colors={['#58CCF7', '#60A5FA', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextSlideButtonGradient}
          >
            <Text style={styles.nextSlideButtonText}>
              {currentSlide < sofiaStorySlides.length - 1 ? 'Siguiente viñeta ➡️' : 'Continuar ✨'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
      
      {/* Progress dots */}
      <View style={styles.progressDots}>
        {sofiaStorySlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
