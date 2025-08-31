import React, { useState, useRef, useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import TriviaCard from '../../components/TriviaCard/TriviaCard';
import TriviaCardScreen5 from '../../components/TriviaCard/TriviaCardScreen5';
import GlossaryGame from '../../components/GlossaryGame/GlossaryGame_fixed';
import TypewriterList from '../../components/TypewriterText/TypewriterList';
import ImageTriviaCard from '../../components/ImageTriviaCard/ImageTriviaCard';
import StorySlide from '../../components/StorySlide/StorySlide';
import { Confetti } from '../../components/TriviaCard/Confetti';

const { width, height } = Dimensions.get('window');

type CnneScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Cnne'>;

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
    title: 'Bienvenida',
    description: 'Hoy conocerás una institución muy importante para Guatemala: la Comisión Nacional de Energía Eléctrica o CNEE.',
    image: require('../../assets/cnee.png'),
  },
  {
    title: '¿Qué es la CNEE?',
    description: 'La CNEE es la institución que dirige el sector eléctrico de Guatemala. No genera electricidad, pero trabaja todos los días para que los guatemaltecos recibamos un servicio de energía de calidad, sin cortes y con precios estables.',
    image: require('../../assets/quees.png'),
  },
  {
    title: '¿Qué hace la CNEE?',
    description: `●  Aplica la ley: hace cumplir la ley de electricidad.\n
●  Protege los derechos de quienes usamos la energía.\n
●  Vigila que las empresas del sector eléctrico actúen correctamente.\n
●  Define cuánto deben cobrar las empresas distribuidoras por llevar la electricidad a los hogares y comercios.\n
●  Resuelve conflictos: ayuda a resolver desacuerdos entre empresas del sector.\n
●  Crea normas: establece reglas técnicas que deben cumplirse.\n
●  Permite el uso de redes para utilizar las redes de energía.`,
  },
  {
    title: '¡Pongamos a prueba tus conocimientos!',
    isTrivia: true,
  },
  {
    title: '¿Qué ha logrado la CNEE?',
    description: `●  Inversión extranjera: empresas de otros países han invertido en Guatemala, generando empleo.\n\n●  Infraestructura moderna: se han construido redes eléctricas nuevas y seguras.\n\n●  Trámites más rápidos y sencillos para los usuarios.\n\n●  Un servicio de energía seguro y de calidad.\n\n●  Precios estables`,
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
    title: '¿Dónde vemos el trabajo de la CNEE en la vida diaria?',
    description: `●  Cuando enciendes la luz en tu cuarto.\n\n●  Cuando cargas tu celular.\n\n●  Cuando tu familia paga el recibo de la luz.\n\n●  Cuando se va la energía y vuelve rápido.\n\n●  Cuando exiges que no te cobren de más.`,
    image: require('../../assets/cinco.png'),
  },
  {
    title: 'Actividad: Relaciona cada situación y decide si es regulada o no por la CNEE',
    isImageTrivia: true,
  },
  {
    title: 'Conoce a Diego y cómo descubre la CNEE',
    isStory: true,
  },
];

export default function CnneScreen() {
  const [step, setStep] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<CnneScreenNavigationProp>();
  const progress = (step + 1) / lessonSteps.length;
  const current = lessonSteps[step];

  // Steps with long info that require scroll to enable continue
  const infoStepsWithScroll = [
    '¿Qué hace la CNEE?',
    '¿Qué ha logrado la CNEE?',
    '¿Dónde vemos el trabajo de la CNEE en la vida diaria?'
  ];

  const isScrollBlockStep = infoStepsWithScroll.includes(current.title);

  // Reset scroll state when step changes
  useEffect(() => {
    setHasScrolledToEnd(!isScrollBlockStep);
    setTypewriterComplete(false);
  }, [step, isScrollBlockStep]);

  // Detectar scroll al final para pasos informativos largos
  const handleScroll = (event: any) => {
    if (isScrollBlockStep) {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const paddingToBottom = 20;
      const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
      setHasScrolledToEnd(isEnd);
    }
  };

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
    <LinearGradient
      colors={['#1a0033', '#2d1b4d', '#3d2b5f', '#2d1b4d', '#1a0033']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.safeArea}
    >
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Título - Oculto para Story */}
        {!current.isStory && (
          <Text style={styles.title}>{current.title}</Text>
        )}

        {/* Indicador visual de scroll en pasos informativos largos */}
        {isScrollBlockStep && !hasScrolledToEnd && (
          <Text style={{ textAlign: 'center', color: '#58CCF7', marginBottom: 8, fontSize: width * 0.037, fontWeight: '600' }}>
            📖 Desliza hacia abajo para leer toda la información
          </Text>
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
          <StorySlide onComplete={handleFinish} />
        ) : (
          <>
            {current.image && (
              <Image
                source={current.image}
                style={current.title === '¿Dónde vemos el trabajo de la CNEE en la vida diaria?' ? styles.imageCinco : styles.image}
              />
            )}
            {/* Tarjeta de información con diseño profesional */}
            <LinearGradient
              colors={['rgba(45, 27, 77, 0.9)', 'rgba(26, 0, 51, 0.95)', 'rgba(45, 27, 77, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.descriptionCard}
            >
              {/* Border interior con gradiente */}
              <View style={styles.gradientBorder} />
              
              {/* Efectos de partículas de estrellas sutiles */}
              <View style={styles.sparkleContainer}>
                <Text style={[styles.sparkle, { top: '5%', left: '88%' }]}>✨</Text>
                <Text style={[styles.sparkle, { bottom: '5%', right: '88%' }]}>⭐</Text>
              </View>
              
              <ScrollView
                style={styles.descriptionScroll}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {current.title === '¿Dónde vemos el trabajo de la CNEE en la vida diaria?' && current.description ? (
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
            </LinearGradient>
          </>
        )}
      </ScrollView>

      {/* Elementos fijos en la parte inferior - Ocultos durante la trivia */}
      {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isStory &&
        (!current.title.includes('vida diaria') || typewriterComplete) && (
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

            {/* Botón continuar o finalizar, oculto hasta que el usuario lea todo en el paso informativo largo */}
            {step < lessonSteps.length - 1 && (
              ((isScrollBlockStep && hasScrolledToEnd) || !isScrollBlockStep) && (
                <TouchableOpacity
                  style={[styles.button, (isScrollBlockStep && !hasScrolledToEnd) && styles.disabledButton]}
                  onPress={handleNext}
                  disabled={isScrollBlockStep && !hasScrolledToEnd}
                >
                  <Text style={[styles.buttonText, (isScrollBlockStep && !hasScrolledToEnd) && styles.disabledButtonText]}>
                    {isScrollBlockStep && !hasScrolledToEnd ? '📖 Lee todo el contenido' : 'Continuar'}
                  </Text>
                </TouchableOpacity>
              )
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
    </LinearGradient>
  );
}
