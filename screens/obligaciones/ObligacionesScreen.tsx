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
import BillGlossary from '../../components/BillGlossary/BillGlossary';
import TypewriterList from '../../components/TypewriterText/TypewriterList';
import ImageTriviaCard from '../../components/ImageTriviaCard/ImageTriviaCard';
import StoryCard from '../../components/StoryCard/StoryCard';
import EnergyDragDropGame from '../../components/EnergyDragDropGame/EnergyDragDropGame';
import ObligacionesDragDrop from '../../components/ObligacionesDragDrop/ObligacionesDragDrop';
import TrueFalseQuiz from '../../components/TrueFalseQuiz/TrueFalseQuiz';
import OrderDragDrop from '../../components/OrderDragDrop/OrderDragDrop';
import ReclamoOrderDragDrop from '../../components/ReclamoOrderDragDrop/ReclamoOrderDragDrop';
import FacturaExplorer from '../../components/FacturaExplorer/FacturaExplorer';
import ConsumptionSimulator from '../../components/ConsumptionSimulator/ConsumptionSimulator';
import DragDropOrder from '../../components/DragDropOrder/DragDropOrder';
import MeterReading from '../../components/MeterReading/MeterReading';
import InteractiveFactura from '../../components/InteractiveFactura/InteractiveFactura';
import SofiaStoryCard from '../../components/SofiaStoryCard/SofiaStoryCard';
import ObligacionesMatching from '../../components/ObligacionesMatching/ObligacionesMatching';
import TermMatching from '../../components/TermMatching/TermMatching';
import { Confetti } from '../../components/TriviaCard/Confetti';

const { width, height } = Dimensions.get('window');

type ObligacionesScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Obligaciones'>;

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
  isInteractiveFactura?: boolean;
  isSimulation?: boolean;
  isTarifaSocialActivity?: boolean;
  isMeterReading?: boolean;
  isTermMatching?: boolean;
}

const lessonSteps: LessonStep[] = [
  {
    title: 'Obligaciones de las empresas distribuidoras',
    description: '¿Sabías que tu empresa distribuidora tiene varias obligaciones que debe cumplir contigo?',
    image: require('../../assets/cnee.png'),
  },
  {
    title: 'Conectar tu servicio',
    description: 'Si tu casa está a menos de 200 metros de la red, deben instalarte el servicio si lo solicitas.\n\nEsta es una de las obligaciones principales de tu empresa distribuidora.',
    image: require('../../assets/conectar.png'),
  },
  {
    title: 'Dar energía continua',
    description: 'No pueden suspender el servicio sin razón o sin avisarte con tiempo.\n\nTienes derecho a un servicio eléctrico estable y confiable.',
    image: require('../../assets/cortar.png'),
  },
  {
    title: 'Revisar tu contador',
    description: 'Deben verificar que mida correctamente tu consumo.\n\nSi crees que tu contador está mal, puedes solicitar una revisión técnica.',
    image: require('../../assets/revisar.png'),
  },
  {
    title: 'Entregar factura a tiempo',
    description: 'Tienes derecho a recibir tu factura mensual puntualmente.\n\nLa factura debe llegar con suficiente tiempo para que puedas pagarla antes del vencimiento.',
    image: require('../../assets/facturatiempo.png'),
  },
    {
    title: 'Reparar fallas eléctricas',
    description: 'Deben atender cortes de luz o fallas en el menor tiempo posible.',
    image: require('../../assets/arreglar.png'),
  },
    {
    title: 'Dar mantenimiento a redes',
    description: ' Postes, cables y transformadores deben funcionar bien y de forma segura.',
    image: require('../../assets/arre.png'),
  },
    {
    title: 'Informar sobre cambios de tarifa',
    description: 'Si el precio cambia, deben informarte con claridad.',
    image: require('../../assets/recibo.png'),
  },

  {
    title: '🎮 Actividad 1: "¿Es obligación o no?"',
    description: 'Arrastra cada frase a la columna correcta.',
    isDragDrop: true,
  },
  {
    title: '💬 ¿Qué pasa si no cumplen?',
    description: 'Tienes derecho a presentar un reclamo formal si:\n\n• No te conectan a la red en caso de solicitarlo, estando dentro de los 200 metros.\n• No recibes tu factura.\n• Se te corta la luz sin motivo o aviso.\n• Tu contador marca mal.\n• No reparan fallas.',
    image: require('../../assets/cnee.png'),
  },
  {
    title: '📋 ¿Cómo reclamar?',
    description: 'Sigue estos pasos para presentar un reclamo efectivo:\n\n1. Comunícate con tu distribuidora.\n2. Explica el problema con detalles.\n3. Anota el número de reclamo.\n4. Espera la respuesta (deben darte una solución en pocos días).\n5. Si no recibes respuesta, puedes acudir a la CNEE.',
    image: require('../../assets/usuario.png'),
  },
  {
    title: '🎮 Actividad 2: Ordena los pasos',
    description: 'Ordena correctamente los pasos para presentar un reclamo.',
    isOrderDragDrop: true,
  },
  {
    title: 'Distribuidora',
    description: 'Empresa que lleva la electricidad a tu casa.\n\nSon las encargadas de mantener la infraestructura eléctrica en buen estado.',
    image: require('../../assets/cables.png'),
  },
  {
    title: 'Contador',
    description: 'Aparato que mide cuánta energía consumes.\n\nDebe estar calibrado correctamente para que pagues solo lo que realmente usas.',
    image: require('../../assets/contador.png'),
  },
  {
    title: 'Tarifa',
    description: 'Precio que pagas por cada kilovatio-hora (kWh) de electricidad consumido.\n\nPuede variar según el horario, el consumo y la empresa distribuidora.',
    image: require('../../assets/cables.png'),
  },
  {
    title: 'Reclamo',
    description: 'Solicitud que haces si detectas un error en tu factura o problemas con el servicio.\n\nTienes derecho a que se investigue y te den una respuesta clara.',
    image: require('../../assets/cables.png'),
  },
  {
    title: '🎮 Actividad 3: "Empareja el término con su definición"',
    description: 'Conecta cada término con su definición correcta.',
    isTermMatching: true,
  },
  {
    title: '🧠 Trivia: "¿Conoces tus derechos?"',
    description: 'Pon a prueba tus conocimientos sobre tus derechos como usuario.',
    isTrueFalse: true,
  },
  {
    title: '🧍 La historia de Sonia',
    description: 'Aprende de la experiencia de Sonia y cómo resolvió su problema.',
    isStory: true,
  },
  {
    title: '🎮 Actividad 4: ¿Qué aprendió Sonia?',
    description: 'Selecciona la lección correcta que aprendió Sonia.',
    isNewTrivia: true,
  },
  {
    title: '📌 En resumen',
    description: 'Puntos clave que debes recordar:\n\n✔ Las distribuidoras deben conectarte a la red, darte energía continua, entregarte la factura, reparar fallas y avisarte de cambios.\n✔ Tienes derecho a reclamar si no cumplen.\n✔ La CNEE vigila que todo esto se cumpla.',
    image: require('../../assets/final.png'),
  },
  {
    title: '🎯 Mensaje final',
    description: 'CNEE: trabajamos día a día para que el servicio de energía sea fluido, confiable y de calidad.',
    image: require('../../assets/cnee.png'),
  },
 
  {
    title: '🎮 Actividad 5: "Arrastra a su obligación"',
    description: 'Relaciona la acción con la norma que debe cumplir la distribuidora.',
    isTarifaSocialActivity: true,
  },
];

export default function ObligacionesScreen() {
  const [step, setStep] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<ObligacionesScreenNavigationProp>();
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
          <BillGlossary onComplete={handleNext} />
        ) : current.isImageTrivia ? (
          <ImageTriviaCard onComplete={handleNext} />
        ) : current.isDragDrop ? (
          <ObligacionesDragDrop onComplete={handleNext} />
        ) : current.isTrueFalse ? (
          <TrueFalseQuiz
            questions={[
              {
                question: '¿Puede la distribuidora cortarte la luz sin avisarte?',
                options: ['Sí', 'No'],
                correctAnswer: 1,
                explanation: 'La respuesta correcta es NO. Las distribuidoras NO pueden suspender el servicio sin razón justificada y sin avisarte con tiempo. Es una de tus garantías como usuario.'
              },
              {
                question: '¿Puedes pedir que revisen tu contador si crees que está mal?',
                options: ['Sí', 'No'],
                correctAnswer: 0,
                explanation: 'La respuesta correcta es SÍ. Tienes derecho a solicitar una revisión técnica de tu contador si sospechas que no está midiendo correctamente tu consumo.'
              },
              {
                question: '¿Quién revisa que las distribuidoras cumplan su trabajo?',
                options: ['El vecino', 'La CNEE', 'El alcalde'],
                correctAnswer: 1,
                explanation: 'La respuesta correcta es LA CNEE. La CNEE (Comisión Nacional de Energía Eléctrica) es la entidad encargada de supervisar que las empresas distribuidoras cumplan con sus obligaciones.'
              }
            ]}
            onComplete={handleNext}
          />
        ) : current.isOrderDragDrop ? (
          <ReclamoOrderDragDrop onComplete={handleNext} />
        ) : current.isInteractiveFactura ? (
          <InteractiveFactura onComplete={handleNext} />
        ) : current.isSimulation ? (
          <ConsumptionSimulator onComplete={handleNext} />
        ) : current.isTarifaSocialActivity ? (
          <ObligacionesMatching onComplete={handleNext} />
        ) : current.isMeterReading ? (
          <MeterReading onComplete={handleNext} />
        ) : current.isTermMatching ? (
          <TermMatching onComplete={handleNext} />
        ) : current.isStory ? (
          <SofiaStoryCard
            slides={[
              { title: 'Sonia recibe una factura altísima', content: 'Un día, Sonia recibió una factura de electricidad mucho más alta de lo normal.' },
              { title: 'Llama a la empresa distribuidora', content: 'Sonia no se quedó callada y llamó inmediatamente a su empresa distribuidora.' },
              { title: 'Solicita una revisión de su contador', content: 'Pidió que revisaran su contador porque sospechaba que algo estaba mal.' },
              { title: 'Le corrigen el error y le reembolsan', content: 'La empresa encontró el error, lo corrigió y le devolvió el dinero de más que había pagado.' },
              { title: 'Sonia aprende sobre sus derechos', content: 'Sonia aprendió que puede exigir un servicio de energía de calidad, seguro y confiable.' }
            ]}
            onComplete={handleNext}
          />
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
      {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isDragDrop && !current.isStory && !current.isTrueFalse && !current.isOrderDragDrop && !current.isInteractiveFactura && !current.isSimulation && !current.isTarifaSocialActivity && !current.isMeterReading && !current.isTermMatching &&
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
