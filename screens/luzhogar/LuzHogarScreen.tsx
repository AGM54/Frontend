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
import SofiaStoryCard from '../../components/SofiaStoryCard/SofiaStoryCard';
import OrderDragDrop from '../../components/OrderDragDrop/OrderDragDrop';
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
  isDragDrop?: boolean;
  isTrueFalse?: boolean;
  isOrderDragDrop?: boolean;
  isSofiaStory?: boolean;
}

const lessonSteps: LessonStep[] = [
  {
    title: 'Fuentes de energía en Guatemala',
    description: 'Guatemala genera electricidad usando diferentes recursos naturales: las centrales hidroeléctricas aprovechan la fuerza del agua, los paneles solares captan la energía del sol, los aerogeneradores usan el viento, las plantas de biomasa queman caña de azúcar, y las centrales térmicas utilizan combustibles.',
    image: require('../../assets/principal.png'),
  },
  {
    title: 'Central Hidroeléctrica',
    description: ' Agua de ríos\nLas centrales hidroeléctricas aprovechan la fuerza del agua de nuestros ríos para generar electricidad de manera limpia y renovable.',
    image: require('../../assets/hidrocolor.png'),
  },
  {
    title: 'Paneles Solares',
    description: ' Sol\nLos paneles solares capturan la energía del sol y la convierten en electricidad, aprovechando uno de nuestros recursos más abundantes.',
    image: require('../../assets/solarcolor.png'),
  },
  {
    title: 'Aerogeneradores',
    description: ' Viento\nLos aerogeneradores utilizan la fuerza del viento para hacer girar sus aspas y generar energía eléctrica de forma sostenible.',
    image: require('../../assets/generadorcolor.png'),
  },
  {
    title: 'Planta de Biomasa',
    description: ' Caña de azúcar\nLas plantas de biomasa queman residuos de caña de azúcar y otros materiales orgánicos para producir electricidad.',
    image: require('../../assets/biomasaa.png'),
  },
  {
    title: 'Planta Térmica',
    description: '🛢️ Combustibles\nLas plantas térmicas utilizan combustibles como gas natural o diesel para generar electricidad cuando se necesita más energía.',
    image: require('../../assets/termopng.png'),
  },
  {
    title: 'Actividad Interactiva: Conecta las Fuentes de Energía',
    isDragDrop: true,
  },
  {
    title: 'Líneas de Transmisión',
    description: 'La electricidad viaja por líneas de alto voltaje desde las plantas hasta todos los departamentos del país.',
    image: require('../../assets/lineastransmision.png'),
  },
  {
    title: 'Distribución en tu colonia y hogar',
    description: 'Las empresas distribuidoras llevan la energía por postes y cables. Llega con la fuerza justa para que la uses con seguridad.',
    image: require('../../assets/casas.png'),
  },
  {
    title: '📘 Sabías que…?',
    description: 'La electricidad que llega a tu casa pasa por un transformador que baja el voltaje para que no dañe tus aparatos. ⚙️🏠',
    image: require('../../assets/sabias.png'),
  },
  {
    title: '🧭 Medidor',
    description: 'Registra cuánto consumes\n\nEl medidor eléctrico es un dispositivo que mide exactamente cuánta electricidad utiliza tu hogar cada mes, para que solo pagues por lo que realmente consumes.',
    image: require('../../assets/contador.png'),
  },
  {
    title: '⚡ Transformador',
    description: 'Ajusta el voltaje para que sea seguro\n\nLos transformadores reducen el alto voltaje de las líneas de transmisión a un nivel seguro que pueden usar los electrodomésticos de tu casa sin dañarse.',
    image: require('../../assets/transformador.png'),
  },
  {
    title: '🧍 Usuario',
    description: 'Persona que recibe y paga por el servicio\n\nTú, como usuario del servicio eléctrico, recibes la energía en tu hogar y pagas mensualmente según tu consumo registrado en el medidor.',
      image: require('../../assets/usuario.png'),
  },
  {
    title: 'Transporte de Electricidad',
    description: 'La energía eléctrica se transporta desde las plantas generadoras hasta las áreas urbanas y rurales del país a través de una extensa red de líneas eléctricas.\n\n🏞️ A través de montañas, valles y llanuras, estas torres llevan electricidad a todos los guatemaltecos.',
  
  },

  {
    title: 'La CNEE: Tu Guardián Energético',
    description: 'La CNEE no genera ni distribuye energía, pero supervisa que todo funcione bien. Vigila que las empresas cumplan, y que las personas reciban un servicio de energía fluido, de calidad y confiable.',
  image: require('../../assets/guardian.png'),
  },
  {
    title: '📘 Sabías que…?',
    description: 'La CNEE también aprueba los proyectos de expansión de redes eléctricas en todo el país.',
    image: require('../../assets/expansion.png'),
  },
  {
    title: '🎮 Mini quiz verdadero/falso',
    isTrueFalse: true,
  },
  {
    title: '',
    isSofiaStory: true,
  },
  {
    title: 'Etapas del viaje de la electricidad',
    
   image: require('../../assets/etapas.png'),
  },
  {
    title: ' 1. Generación',
    description: '📍 ¿Dónde empieza?\nEn las plantas generadoras, que convierten agua, sol, viento, biomasa o combustibles en electricidad.\n\n📘 Dato: En Guatemala, más del 60% de la energía proviene de fuentes renovables.',
  image: require('../../assets/pares.png'),
  },
  {
    title: ' 2. Transmisión',
    description: '📍 ¿Cómo se mueve?\nA través de líneas de alto voltaje, sostenidas por grandes torres. Estas líneas llevan la electricidad por todo el país de forma rápida y segura.\n\n📘 Dato: Las líneas de transmisión operan con altos voltajes para que no se pierda energía en el camino.',
  image: require('../../assets/distribucion.png'),
  },
  {
    title: ' 3. Distribución',
    description: '📍 ¿Cómo llega a ti?\nLas empresas distribuidoras bajan el voltaje y envían la electricidad por los postes y cables de tu colonia hasta llegar a tu casa. Un medidor registra cuánto usas.\n\n📘 Dato: ¡Pagas solo por lo que consumes! La CNEE supervisa que las empresas distribuidoras cobren las tarifas autorizadas.',
  image: require('../../assets/casad.png'),
  },
  {
    title: '',
    isOrderDragDrop: true,
  },
  {
    title: ' En resumen',
    description: '🔌 La luz que usas cada día sigue un recorrido desde su generación hasta tu hogar.\n\n⚡ La CNEE no produce ni distribuye la energía, pero vigila que todo el sistema funcione de forma eficiente, confiable y segura.',
    image: require('../../assets/final.png'),
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

  // Animation values for curious fact
  const lightningOpacity = useRef(new Animated.Value(0)).current;
  const factScale = useRef(new Animated.Value(0.8)).current;

  // Resetear typewriter cuando cambia el paso
  React.useEffect(() => {
    setTypewriterComplete(false);
  }, [step]);

  // Lightning animation effect
  useEffect(() => {
    if (current.title === 'Transporte de Electricidad') {
      // Start lightning animation
      const lightningAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(lightningOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(lightningOpacity, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(lightningOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(lightningOpacity, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      // Start fact scale animation
      const scaleAnimation = Animated.spring(factScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      });

      lightningAnimation.start();
      scaleAnimation.start();

      return () => {
        lightningAnimation.stop();
        factScale.setValue(0.8);
        lightningOpacity.setValue(0);
      };
    }
  }, [current.title, lightningOpacity, factScale]);

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
        ) : current.isStory ? (
          <StoryCard onComplete={handleNext} />
        ) : current.isSofiaStory ? (
          <SofiaStoryCard onComplete={handleNext} />
        ) : (
          <>
            {current.image && (
              <View style={styles.imageContainer}>
                <Image
                  source={current.image}
                  style={current.title === '¿Cómo llega la electricidad a tu hogar específicamente?' ? styles.imageCinco : styles.image}
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
                ) : current.title === 'Transporte de Electricidad' ? (
                  <>
                    <Text style={styles.description}>
                      {current.description?.split('\n\n')[0] || ''}
                    </Text>
                    <Animated.View 
                      style={[
                        styles.curiousFact,
                        {
                          transform: [{ scale: factScale }]
                        }
                      ]}
                    >
                      <LinearGradient
                        colors={['rgba(139, 69, 255, 0.4)', 'rgba(75, 0, 130, 0.5)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.curiousFactGradient}
                      >
                        <Text style={styles.curiousFactText}>
                          📘 Dato curioso:
                        </Text>
                        <Text style={[styles.curiousFactText, { marginTop: height * 0.01 }]}>
                          La electricidad viaja a casi la velocidad de la luz.
                        </Text>
                        <Animated.Text 
                          style={[
                            styles.lightningIcon,
                            {
                              opacity: lightningOpacity
                            }
                          ]}
                        >
                          ⚡
                        </Animated.Text>
                      </LinearGradient>
                    </Animated.View>
                  </>
                ) : (
                  <Text style={styles.description}>{current.description || ''}</Text>
                )}
              </ScrollView>
            </LinearGradient>
          </>
        )}
      </ScrollView>

      {/* Elementos fijos en la parte inferior - Ocultos durante la trivia */}
      {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isDragDrop && !current.isStory && !current.isTrueFalse && !current.isSofiaStory && !current.isOrderDragDrop &&
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
