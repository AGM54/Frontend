import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

export default function ElectricidadScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={{ opacity: fadeAnim }}
      >
        {/* Encabezado centrado */}
        <View style={styles.headerCentered}>
          <Text style={styles.titleCentered}>¿Qué es la electricidad?</Text>
        </View>

        <Text style={styles.description}>
          La energía eléctrica es una forma de energía esencial en la vida moderna.
          Está presente en todo lo que nos rodea: desde la luz en nuestras casas.
        </Text>

        {/* Tarjetas con degradado morado */}
        {[
          { title: '¿Qué es un electrón?', duration: '2 min', image: require('../../assets/atomo.png') },
          { title: 'Generación', duration: '2 min', image: require('../../assets/rayo.png') },
          { title: 'Corriente', duration: '2 min', image: require('../../assets/corriente.png') },
          { title: 'Conductores y aislantes', duration: '3 min', image: require('../../assets/conductores.png') },
          { title: 'Seguridad básica', duration: '3 min', image: require('../../assets/seguridad.png') },
        ].map((lesson, index) => (
          <LinearGradient
            key={index}
            colors={['#5A189A', '#7B2CBF']} // degradado morado
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.lessonCardGradient}
          >
            <View style={styles.lessonContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={styles.row}>
                  <Ionicons name="flash-outline" size={18} color="#fff" />
                  <Text style={styles.duration}>{lesson.duration}</Text>
                </View>
              </View>
              <Image source={lesson.image} style={styles.lessonImageSide} />
            </View>
          </LinearGradient>
        ))}
      </Animated.ScrollView>

      {/* Menú inferior blanco */}
      <View style={[styles.bottomMenuGradient, { backgroundColor: '#fff' }]}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="bar-chart" size={24} color="#061C64" />
          <Text style={styles.menuText}>Progreso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="person" size={24} color="#061C64" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="book" size={24} color="#061C64" />
          <Text style={styles.menuText}>Lecciones</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
