import React, { useState } from 'react';
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
import TriviaCard from '../../components/TriviaCard/TriviaCard';

const { width, height } = Dimensions.get('window');

const lessonSteps = [
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
    title: 'Regulación de tarifas',
    description: 'La CNEE establece las tarifas eléctricas justas para garantizar un servicio de calidad a precios accesibles para todos los guatemaltecos.',
    image: require('../../assets/facturaa.png'),
  },
  {
    title: 'Supervisión de calidad',
    description: 'Monitorea constantemente la calidad del servicio eléctrico para asegurar que cumpla con los estándares establecidos.',
    image: require('../../assets/transmision.png'),
  },
  {
    title: 'Protección al usuario',
    description: 'Defiende los derechos de los consumidores y resuelve conflictos entre usuarios y empresas distribuidoras de electricidad.',
    image: require('../../assets/personatarjeta.png'),
  },
  {
    title: 'Importancia para Guatemala',
    description: 'La CNEE garantiza un sector eléctrico competitivo, eficiente y confiable que contribuye al desarrollo económico del país.',
    image: require('../../assets/cnee.png'),
  },
  {
    title: 'Contacto y servicios',
    description: 'Los ciudadanos pueden contactar a la CNEE para consultas, quejas o información sobre el servicio eléctrico en Guatemala.',
    image: require('../../assets/personatarjeta.png'),
  },
];

export default function CnneScreen() {
  const [step, setStep] = useState(0);
  const progress = (step + 1) / lessonSteps.length;
  const current = lessonSteps[step];

  const handleNext = () => {
    if (step < lessonSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleFinish = () => {
    alert('¡Lección completada! 🎉');
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
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Título */}
        <Text style={styles.title}>{current.title}</Text>

        {/* Contenido */}
        {current.isTrivia ? (
          <TriviaCard onComplete={handleNext} />
        ) : (
          <>
            {current.image && <Image source={current.image} style={styles.image} />}
            {/* Tarjeta de información */}
            <View style={styles.descriptionCard}>
              <ScrollView
                style={styles.descriptionScroll}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                <Text style={styles.description}>{current.description}</Text>
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      {/* Elementos fijos en la parte inferior - Ocultos durante la trivia */}
      {!current.isTrivia && (
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
    </SafeAreaView>
  );
}