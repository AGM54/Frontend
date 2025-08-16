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
  Animated,
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
import StoryCard from '../../components/StoryCard/StoryCard';
import EnergyDragDropGame from '../../components/EnergyDragDropGame/EnergyDragDropGame';
import TrueFalseQuiz from '../../components/TrueFalseQuiz/TrueFalseQuiz';
import OrderDragDrop from '../../components/OrderDragDrop/OrderDragDrop';
import FacturaExplorer from '../../components/FacturaExplorer/FacturaExplorer';
import ConsumptionSimulator from '../../components/ConsumptionSimulator/ConsumptionSimulator';
import { Confetti } from '../../components/TriviaCard/Confetti';

const { width, height } = Dimensions.get('window');

type PreciosFacturaScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'PreciosFactura'>;

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
  isDragDrop?: boolean;
  isTrueFalse?: boolean;
  isOrderDragDrop?: boolean;
  isFacturaExplorer?: boolean;
  isSimulation?: boolean;
}

const lessonSteps: LessonStep[] = [
  {
    title: '¿Quién fija el precio de la luz?',
    description: 'El precio de la luz lo fija la Comisión Nacional de Energía Eléctrica, CNEE.\n\nGracias a su trabajo, el precio de la energía se ha mantenido estable para beneficio de todos los guatemaltecos.\n\n📘 Dato extra:\nLa CNEE revisa cada 3 meses los costos de producción de energía y ajusta los precios, si es necesario, pensando siempre en los usuarios.',
    image: require('../../assets/guardian.png'),
  },
  {
    title: '¿Qué es una factura eléctrica?',
    description: 'Cada mes recibes tu factura. El monto a pagar depende del consumo de energía de tu hogar o negocio.\n\nTu factura incluye datos importantes que debes revisar.',
    image: require('../../assets/recibo.png'),
    isFacturaExplorer: true,
  },
  {
    title: '¿Cómo se calcula lo que pagas?',
    description: 'El precio se basa en los kilovatios hora (kWh) que consumiste.\n\n¡Entre menos consumes, menos pagas!',
    image: require('../../assets/contador.png'),
    isSimulation: true,
  },
  {
    title: 'Glosario animado de la factura',
    isGlossary: true,
  },
  {
    title: 'Trivia: ¿Qué tanto entiendes tu factura de energía?',
    isTrivia: true,
  },
  {
    title: 'La historia de Manuel y su factura sorpresa',
    isStory: true,
  },
  {
    title: 'Actividad: Ordena tu factura',
    description: 'Comprender el orden correcto y el propósito de cada sección de una factura eléctrica.',
    isOrderDragDrop: true,
  },
  {
    title: '¿Qué es el subsidio a la tarifa social?',
    description: 'En Guatemala existe una tarifa especial para familias que consumen poca energía eléctrica: la tarifa social.\n\n⚡ Usuarios que consumen 0 a 88 kWh al mes reciben este beneficio.\n⚡ El gobierno lo otorga a través del INDE bajo supervisión de la CNEE.\n⚡ Pagas solo una parte del precio total; el resto lo cubre el Estado.',
    image: require('../../assets/usuario.png'),
  },
  {
    title: '¿Cómo leer tu medidor eléctrico?',
    description: 'El medidor es el aparato que mide tu consumo de energía.\n\nSuele estar fuera de tu casa y tiene un número en kilovatios hora (kWh). Cada mes, ese número es registrado por la empresa y se usa para generar tu factura.\n\n📘 Dato: Si crees que el consumo registrado no es correcto, puedes solicitar una revisión técnica.',
    image: require('../../assets/contador.png'),
  },
  {
    title: '📘 Sabías que…?',
    description: '¿Guatemala tiene uno de los sistemas eléctricos más modernos y eficientes de Latinoamérica? La ley de electricidad de Guatemala ha sido estudiada como caso de éxito en otros países.\n\nLa CNEE no solo define los precios de energía a los usuarios residenciales, también supervisa que las empresas distribuidoras atiendan los reclamos de los usuarios en caso de error en la factura eléctrica.\n\nUna familia promedio en Guatemala consume entre 100 y 200 kWh al mes.',
    image: require('../../assets/sabias.png'),
  },
  {
    title: 'En resumen',
    description: '📄 Lo que aprendiste hoy:\n\n• La CNEE fija el precio de la electricidad.\n• Tu factura muestra tu consumo real en kWh.\n• Si ves un error, tienes derecho a reclamar a la distribuidora.\n• Puedes usar el simulador en línea de la CNEE para estimar cuánto pagarás.\n• Revisar tu factura es muy importante para controlar tu consumo y detectar errores.',
    image: require('../../assets/final.png'),
  },
];

export default function PreciosFacturaScreen() {
  const [step, setStep] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<PreciosFacturaScreenNavigationProp>();
  const progress = (step + 1) / lessonSteps.length;
  const current = lessonSteps[step];

  // Animation values for curious fact
  const lightningOpacity = useRef(new Animated.Value(0)).current;
  const factScale = useRef(new Animated.Value(0.8)).current;

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
        ) : current.isDragDrop ? (
          <EnergyDragDropGame onComplete={handleNext} />
        ) : current.isTrueFalse ? (
          <TrueFalseQuiz onComplete={handleNext} />
        ) : current.isOrderDragDrop ? (
          <OrderDragDrop onComplete={handleNext} />
        ) : current.isFacturaExplorer ? (
          <FacturaExplorer onComplete={handleNext} />
        ) : current.isSimulation ? (
          <ConsumptionSimulator onComplete={handleNext} />
        ) : current.isStory ? (
          <StoryCard onComplete={handleNext} />
        ) : (
          <>
            {current.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={current.image}
                  style={styles.image}
                />
              </View>
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
                <Text style={styles.description}>{current.description || ''}</Text>
              </ScrollView>
            </LinearGradient>
          </>
        )}
      </ScrollView>

      {/* Elementos fijos en la parte inferior - Ocultos durante la trivia */}
      {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isDragDrop && !current.isStory && !current.isTrueFalse && !current.isOrderDragDrop && !current.isFacturaExplorer && !current.isSimulation &&
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
    </LinearGradient>
  );
}
