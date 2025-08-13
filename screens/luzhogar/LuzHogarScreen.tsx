import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import TriviaCard from '../../components/TriviaCard/TriviaCard';
import TriviaCardScreen5 from '../../components/TriviaCard/TriviaCardScreen5';
import GlossaryGame from '../../components/GlossaryGame/GlossaryGame_fixed';
import TypewriterList from '../../components/TypewriterText/TypewriterList';
import ImageTriviaCard from '../../components/ImageTriviaCard/ImageTriviaCard';
import StoryCard from '../../components/StoryCard/StoryCard';
import { Confetti } from '../../components/TriviaCard/Confetti';

const { width, height } = Dimensions.get('window');

type LuzHogarScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'LuzHogar'>;

interface LessonStep {
  title: string;
  description?: string;
  image?: any;
  isTrivia?: boolean;
  isNewTrivia?: boolean;
  isGlossary?: boolean;
  isAchievements?: boolean;
  isImageTrivia?: boolean;
  isStory?: boolean;
}

const lessonSteps: LessonStep[] = [
  {
    title: '¿Te has preguntado cómo llega la luz a tu casa?',
    description: 'Todo parte con la producción de electricidad en Guatemala: usamos agua, sol, viento, caña y combustibles para generarla.',
    image: require('../../assets/transmision.png'),
  },
  {
    title: 'Fuentes de energía en Guatemala',
    description: 'Guatemala genera electricidad usando diferentes recursos naturales: las centrales hidroeléctricas aprovechan la fuerza del agua, los paneles solares captan la energía del sol, los aerogeneradores usan el viento, las plantas de biomasa queman caña de azúcar, y las centrales térmicas utilizan combustibles.',
    image: require('../../assets/fuente.png'),
  },
  {
    title: 'El proceso de generación',
    description: `●  Centrales generadoras: crean electricidad usando diferentes fuentes.\n
●  Transformadores: aumentan el voltaje para el transporte.\n
●  Torres de transmisión: llevan la electricidad a grandes distancias.\n
●  Subestaciones: reducen el voltaje para distribución.\n
●  Redes de distribución: llevan la energía hasta los hogares.\n
●  Medidores: registran el consumo de cada hogar.`,
    image: require('../../assets/trans.png'),
  },
  {
    title: '¡Pongamos a prueba tus conocimientos!',
    isTrivia: true,
  },
  {
    title: 'El viaje de la electricidad',
    description: `●  Generación: se produce en centrales eléctricas.\n\n●  Transmisión: viaja por cables de alta tensión.\n\n●  Distribución: se reduce el voltaje en subestaciones.\n\n●  Entrega: llega a tu hogar a través de cables de baja tensión.\n\n●  Medición: un medidor registra cuánta energía usas.`,
    isAchievements: true,
  },
  {
    title: 'Trivia - ¡Pon a prueba tu conocimiento!',
    isNewTrivia: true,
  },
  {
    title: 'Glosario animado',
    isGlossary: true,
  },
  {
    title: '¿Cómo llega la electricidad a tu hogar específicamente?',
    description: `●  Desde las centrales generadoras por torres de alta tensión.\n\n●  A través de subestaciones que reducen el voltaje.\n\n●  Por cables de distribución en tu vecindario.\n\n●  Hasta el medidor de tu casa.\n\n●  Y finalmente a los enchufes y focos de tu hogar.`,
    image: require('../../assets/transmision.png'),
  },
  {
    title: 'Actividad: Identifica cada paso del proceso eléctrico',
    isImageTrivia: true,
  },
  {
    title: 'Descubre el increíble viaje de la electricidad',
    isStory: true,
  },
];

export default function LuzHogarScreen() {
  const [step, setStep] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<LuzHogarScreenNavigationProp>();
  const progress = (step + 1) / lessonSteps.length;
  const current = lessonSteps[step];

  // Resetear typewriter cuando cambia el paso
  React.useEffect(() => {
    setTypewriterComplete(false);
  }, [step]);

  const handleNext = () => {
    if (step < lessonSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigation.navigate('HomeMain');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo */}
      <Image
        source={require('../../assets/icon.png')}
        style={{
          position: 'absolute',
          top: height * 0.02,
          right: width * 0.04,
          width: width * 0.25,
          height: height * 0.05,
          zIndex: 99,
          opacity: 0.95,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        }}
        resizeMode="contain"
      />

      {/* Contenido scrolleable */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Título - Oculto para Story */}
        {!current.isStory && (
          <Text style={styles.title}>{current.title}</Text>
        )}

        {/* Contenido */}
        {current.isTrivia ? (
          <TriviaCard onComplete={handleNext} />
        ) : current.isNewTrivia ? (
          <TriviaCardScreen5 onComplete={handleNext} />
        ) : current.isGlossary ? (
          <GlossaryGame onComplete={handleNext} />
        ) : current.isImageTrivia ? (
          <ImageTriviaCard onComplete={handleNext} />
        ) : current.isStory ? (
          <StoryCard onComplete={handleFinish} />
        ) : (
          <>
            {current.image && (
              <Image
                source={current.image}
                style={current.title === '¿Cómo llega la electricidad a tu hogar específicamente?' ? styles.imageCinco : styles.image}
              />
            )}
            {/* Tarjeta de información */}
            <View style={styles.descriptionCard}>
              <ScrollView
                style={styles.descriptionScroll}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {current.title === '¿Cómo llega la electricidad a tu hogar específicamente?' && current.description ? (
                  <TypewriterList
                    items={current.description.split('\n\n').map(item => item.replace('●  ', '').trim()).filter(item => item.length > 0)}
                    itemStyle={styles.description}
                    speed={25}
                    itemDelay={1200}
                    startDelay={500}
                    onComplete={() => setTypewriterComplete(true)}
                    scrollViewRef={scrollViewRef}
                    autoScroll={false}
                  />
                ) : (
                  <Text style={styles.description}>{current.description || ''}</Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      {/* Elementos fijos en la parte inferior - Ocultos durante la trivia */}
      {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isStory &&
        (!current.title.includes('específicamente') || typewriterComplete) && (
          <View style={styles.fixedBottom}>
            {/* Barra de progreso */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
            </View>

            {/* Indicadores de pasos */}
            <View style={styles.stepIndicators}>
              {lessonSteps.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.circle,
                    i === step && styles.activeCircle,
                    { backgroundColor: i === step ? '#58CCF7' : 'rgba(255, 255, 255, 0.1)' },
                  ]}
                />
              ))}
            </View>

            {/* Botón continuar o finalizar */}
            {step < lessonSteps.length - 1 && (
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            )}

            {step === lessonSteps.length - 1 && (
              <TouchableOpacity style={[styles.button, styles.finishButton]} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finalizar lección</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}
    </SafeAreaView>
  );
}
