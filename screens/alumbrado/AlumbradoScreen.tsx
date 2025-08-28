const { width, height } = Dimensions.get('window');

type AlumbradoScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Alumbrado'>;
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
import TrueFalseQuiz from '../../components/TrueFalseQuiz/TrueFalseQuiz';
import BillGlossary from '../../components/BillGlossary/BillGlossary';
import ImageTriviaCard from '../../components/ImageTriviaCard/ImageTriviaCard';
import EnergyDragDropGame from '../../components/EnergyDragDropGame/EnergyDragDropGame';
import AlumbradoDragDrop from '../../components/AlumbradoDragDrop/AlumbradoDragDrop';
import AlumbradoSelectMatch from '../../components/AlumbradoDragDrop/AlumbradoSelectMatch';
import OrderDragDrop from '../../components/OrderDragDrop/OrderDragDrop';
import InteractiveFactura from '../../components/InteractiveFactura/InteractiveFactura';
import ConsumptionSimulator from '../../components/ConsumptionSimulator/ConsumptionSimulator';
import DragDropOrder from '../../components/DragDropOrder/DragDropOrder';
import MeterReading from '../../components/MeterReading/MeterReading';
import SofiaStoryCard from '../../components/SofiaStoryCard/SofiaStoryCard';
import { Confetti } from '../../components/TriviaCard/Confetti';

// ...existing code...

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
  isDragDropAlumbrado?: boolean;
  isAlumbradoSelectMatch?: boolean;
  questions?: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  dragDropAlumbradoData?: Array<{
    phrase: string;
    entity: string;
  }>;
}

const lessonSteps: LessonStep[] = [
  {
    title: '¿Qué es el alumbrado público?',
    description: 'El alumbrado público son las luces que iluminan calles, avenidas, parques y espacios públicos. Sirve para:\n\n● Caminar con más seguridad.\n● Prevenir accidentes.\n● Que nuestras calles y plazas no estén oscuras.\n\n🎞️ Visual:\nFaroles encendidos, niños jugando, personas caminando en la noche.',
    image: require('../../assets/parque.png'),
  },
  {
    title: '🧍 Ejemplo ilustrado – El caso de Julio',
    description: '📘 Viñeta tipo historia:\n1. Julio nota un cobro nuevo en su factura: "alumbrado público".\n2. Pregunta a la empresa distribuidora, que le informa que es un cobro municipal.\n3. Visita su municipalidad, donde le explican cómo se calcula.\n4. Julio entiende que el cobro es legal, pero siempre hay que estar atentos.\n5. Aprende que debe aparecer separado del consumo de energía.',
    image: require('../../assets/final.png'),
    isStory: true,
  },

  {
    title: '🎮 Actividad 3: ¿Qué aprendió Julio?',
    isTrueFalse: true,
    description: '¿Qué aprendió Julio?',
    questions: [
      {
        question: '¿Qué aprendió Julio?',
        options: [
          'Que el cobro debe explicarse y puede consultarse tanto en la distribuidora como en la municipalidad.',
          'Que la CNEE fija el monto del alumbrado público.',
          'Que no puede reclamar si hay errores en la factura.'
        ],
        correctAnswer: 0
      }
    ]
  },

  {
    title: 'Marco legal',
    description: '🧾 Fundamento:\nEl Artículo 68, literal a) del Código Municipal de Guatemala (Decreto 12-2002) establece que el alumbrado público es una competencia propia del municipio, lo que implica su obligación de prestar este servicio de forma directa o mediante convenios.\n\nEste permite que las municipalidades cobren una tasa de alumbrado público a través de la empresa distribuidora.\n\n👥 La CNEE no puede intervenir en el monto, pero sí vigilar que se respete la ley en cómo se refleja en la factura.\n\n🎮 Actividad 2:\nAparecen frases: el usuario debe arrastrar si le corresponde a la CNEE o a la Municipalidad.',
    image: require('../../assets/leyes.png'),
  
  },
  {
  title: '🎮 Actividad: Selecciona la frase y la entidad correcta',
  description: 'Selecciona una frase y luego la entidad a la que corresponde (CNEE, Municipalidad o Distribuidora).',
  isAlumbradoSelectMatch: true,
  },
  {
    title: '🧠 Trivia rápida',
    description: 'Pregunta 1: ¿Quién fija la tasa de alumbrado público?\nPregunta 2: ¿Se puede reclamar a la distribuidora si el cobro no está detallado en la factura?\nPregunta 3: ¿La CNEE cobra el alumbrado?',
    isTrueFalse: true,
  },
  {
    title: '🧍 Ejemplo ilustrado – El caso de Julio',
    description: '📘 Viñeta tipo historia:\n1. Julio nota un cobro nuevo en su factura: "alumbrado público".\n2. Pregunta a la empresa distribuidora, que le informa que es un cobro municipal.\n3. Visita su municipalidad, donde le explican cómo se calcula.\n4. Julio entiende que el cobro es legal, pero siempre hay que estar atentos.\n5. Aprende que debe aparecer separado del consumo de energía.\n\n🎮 Actividad 3: ¿Qué aprendió Julio?',
    isStory: true,
  },
  {
    title: '📌 En resumen',
    description: '✔ El alumbrado público es importante para que nuestras calles y plazas estén iluminadas.\n✔ Lo cobra la empresa distribuidora a través de la factura eléctrica.\n✔ La CNEE no lo fija, pero sí revisa que se detalle bien en la factura.\n✔ Si no aparece claro, puedes presentar un reclamo a la distribuidora.\n\n🎯 Slogan final:\n"Una ciudad segura es una ciudad bien iluminada.\nConsulta y aprende a leer tu factura de energía."',
    image: require('../../assets/final.png'),
  },
  {
    title: '🧾 ¿Por qué varía el cobro entre municipios?',
    description: '🧠 Texto explicativo:\nEl monto que pagas por alumbrado público no es igual en todos los municipios. Cambia según:\n\n● Cuántas lámparas hay en tu barrio o municipio.\n● Si las luminarias son tradicionales o LED.\n● Cuánto presupuesto tiene tu municipalidad.\n● Qué porcentaje se cobra según tu consumo.\n\n📌 Por eso, aunque consumas lo mismo, puedes pagar más o menos que otra persona que viva en otro municipio.',
    image: require('../../assets/poste.png'),
  },
  {
    title: '📘 ¿Qué pasa si hay una lámpara dañada?',
    description: '🧠 Texto explicativo:\nSi ves una lámpara pública dañada o que no funciona:\n\n1. Toma nota de la ubicación.\n2. Verifica si tu municipalidad tiene un canal de reporte.\n3. Llama o escribe a tu empresa distribuidora.\n\n📌 La responsabilidad primaria es de la municipalidad, pero algunas delegan el mantenimiento a la distribuidora.\n\n🎞️ Visual:\nEscena nocturna con una lámpara fundida → usuario reporta vía teléfono o app → técnico la arregla.\n\n🎮 Actividad 5: ¿A quién reporto esta lámpara dañada?',
    image: require('../../assets/poste.png'),
    isNewTrivia: true,
  },
  {
    title: '📊 ¿Cuánto se invierte en alumbrado?',
    description: '🧾 Texto informativo:\nEl dinero que se cobra por alumbrado público no se va a la CNEE ni a la empresa distribuidora. Se transfiere a la municipalidad, que debe usarlo para:\n\n● Pagar el consumo de energía de luminarias.\n● Dar mantenimiento a postes y cables.\n● Ampliar la cobertura de alumbrado.\n● Sustituir bombillas por luminarias LED.\n\n📌 Puedes pedir a tu municipalidad un informe de cómo se usa ese dinero (Ley de Acceso a la Información Pública).\n\n🎮 Actividad 6: Arma el presupuesto\nEl usuario arrastra etiquetas ("energía", "reparaciones", "expansión") al gráfico de torta para armar cómo se distribuye el fondo.',
    image: require('../../assets/guardian.png'),
    isOrderDragDrop: true,
  },
  {
    title: '🧠 Trivia extendida – ¿Cuánto sabes?',
    description: '📋 Pregunta 1: ¿A quién debes acudir si tienes dudas sobre el monto del cobro de alumbrado?\n📋 Pregunta 2: ¿La CNEE puede modificar el monto que cobras por alumbrado público?\n📋 Pregunta 3: ¿Puedes consultar cómo se usa el dinero del alumbrado?\n📋 Pregunta 4: ¿El cobro debe estar separado de tu consumo?',
    isTrivia: true,
  },
  {
    title: '✅ Lo que debes saber sobre el alumbrado público',
    description: '🧾 Lista clara:\n\n● Saber cuánto pagas exactamente por alumbrado público.\n● Ver ese cobro separado en tu factura.\n● Consultar cómo se calculó y qué cubre.\n● Reclamar si hay errores o cobros duplicados.\n● Solicitar reparación de luminarias dañadas.\n● Pedir que se ilumine una zona oscura (la muni evaluará).\n\n🎮 Actividad 7: "Todo lo que debes saber sobre alumbrado público" (tipo memory)\nEmpareja íconos (lupa, signo de pregunta, foco) con los derechos correspondientes.',
    image: require('../../assets/final.png'),
    isImageTrivia: true,
  },
];

export default function AlumbradoScreen() {
  const [step, setStep] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<AlumbradoScreenNavigationProp>();
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
          <TrueFalseQuiz
            questions={[
              {
                question: '¿A quién debes acudir si tienes dudas sobre el monto del cobro de alumbrado?',
                options: ['Empresa de telefonía', 'Municipalidad y/o distribuidora', 'Policía'],
                correctAnswer: 1
              },
              {
                question: '¿La CNEE puede modificar el monto que cobras por alumbrado público?',
                options: ['Sí', 'No'],
                correctAnswer: 1
              },
              {
                question: '¿Puedes consultar cómo se usa el dinero del alumbrado?',
                options: ['Sí, en la municipalidad', 'No, es confidencial'],
                correctAnswer: 0
              },
              {
                question: '¿El cobro debe estar separado de tu consumo?',
                options: ['Sí', 'No'],
                correctAnswer: 0
              }
            ]}
            onComplete={handleNext}
          />
        ) : current.isNewTrivia ? (
          <TrueFalseQuiz
            questions={[
              {
                question: '¿A quién reporto una lámpara dañada?',
                options: ['Policía Nacional', 'Empresa de telefonía', 'Municipalidad y/o distribuidora'],
                correctAnswer: 2
              }
            ]}
            onComplete={handleNext}
          />
        ) : current.isGlossary ? (
          <BillGlossary onComplete={handleNext} />
        ) : current.isImageTrivia ? (
          <ImageTriviaCard onComplete={handleNext} />
        ) : current.isDragDrop ? (
          <EnergyDragDropGame onComplete={handleNext} />
        ) : current.dragDropAlumbradoData ? (
          <EnergyDragDropGame alumbradoData={current.dragDropAlumbradoData} onComplete={handleNext} />
        ) : current.isAlumbradoSelectMatch ? (
          <AlumbradoSelectMatch onComplete={handleNext} />
        ) : current.isTrueFalse ? (
          <TrueFalseQuiz
            questions={[
              {
                question: '¿Quién fija la tasa de alumbrado público?',
                options: ['CNEE', 'Municipalidad', 'Empresa distribuidora'],
                correctAnswer: 1
              },
              {
                question: '¿Se puede reclamar a la distribuidora si el cobro no está detallado en la factura?',
                options: ['Sí', 'No'],
                correctAnswer: 0
              },
              {
                question: '¿La CNEE cobra el alumbrado?',
                options: ['Sí', 'No'],
                correctAnswer: 1
              }
            ]}
            onComplete={handleNext}
          />
        ) : current.isOrderDragDrop ? (
          <OrderDragDrop onComplete={handleNext} />
        ) : current.isInteractiveFactura ? (
          <InteractiveFactura onComplete={handleNext} />
        ) : current.isSimulation ? (
          <ConsumptionSimulator onComplete={handleNext} />
        ) : current.isTarifaSocialActivity ? (
          <DragDropOrder onComplete={handleNext} />
        ) : current.isMeterReading ? (
          <MeterReading onComplete={handleNext} />
        ) : current.isStory ? (
          <SofiaStoryCard
            slides={[
              { 
                title: 'Julio nota un cobro nuevo', 
                content: 'Julio nota un cobro nuevo en su factura: "alumbrado público".' 
              },
              { 
                title: 'Pregunta a la distribuidora', 
                content: 'Pregunta a la empresa distribuidora, que le informa que es un cobro municipal.' 
              },
              { 
                title: 'Visita su municipalidad', 
                content: 'Visita su municipalidad, donde le explican cómo se calcula.' 
              },
              { 
                title: 'Entiende que es legal', 
                content: 'Julio entiende que el cobro es legal, pero siempre hay que estar atentos.' 
              },
              { 
                title: 'Aprende sobre la separación', 
                content: 'Aprende que debe aparecer separado del consumo de energía.' 
              }
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
  {!current.isTrivia && !current.isNewTrivia && !current.isGlossary && !current.isImageTrivia && !current.isDragDrop && !current.isStory && !current.isTrueFalse && !current.isOrderDragDrop && !current.isInteractiveFactura && !current.isSimulation && !current.isTarifaSocialActivity && !current.isMeterReading && !current.isAlumbradoSelectMatch &&
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
