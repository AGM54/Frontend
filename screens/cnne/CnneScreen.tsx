import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { styles } from './styles';

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
    title: 'Funciones principales',
    description: 'La CNEE regula las tarifas eléctricas, supervisa la calidad del servicio y protege los derechos de los usuarios.',
    image: require('../../assets/cnee.png'),
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
          top: 10,
          right: 16,
          width: width * 0.25,
          height: height * 0.05,
          zIndex: 99,
        }}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>{current.title}</Text>

      {/* Contenido */}
      {current.image && <Image source={current.image} style={styles.image} />}

      {/* Tarjeta de información */}
      <View style={styles.descriptionCard}>
        <Text style={styles.description}>{current.description}</Text>
      </View>

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
              { backgroundColor: i === step ? '#FF7A00' : '#ccc' },
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
        <TouchableOpacity style={[styles.button, { backgroundColor: '#00C853' }]} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finalizar lección</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}