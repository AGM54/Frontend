// src/screens/Home/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';

import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Buenas tardes, <Text style={styles.username}>David</Text> <Text style={styles.wave}>👋</Text></Text>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardPrimary}>
          <Text style={styles.cardLabel}>Lecciones</Text>
          <Text style={styles.cardTitle}>¿Qué es la electricidad?</Text>
          <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>

          <View style={styles.cardInfoRow}>
            <Ionicons name="play-circle" size={18} color="#000" />
            <Text style={styles.cardInfo}>3 min</Text>
            <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
            <Text style={styles.cardInfo}>30 min lectura</Text>
          </View>
        </View>

        <View style={styles.tabGroup}>
          <TouchableOpacity style={styles.tabActive}><Text style={styles.tabActiveText}>Lecciones</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Videos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Progreso</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Glosario</Text></TouchableOpacity>
        </View>

        <View style={styles.cardSecondary}>
          <Text style={styles.cardTitle}>Qué es la generación de electricidad</Text>
          <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>
          <View style={styles.cardInfoRow}>
            <Ionicons name="play-circle" size={18} color="#000" />
            <Text style={styles.cardInfo}>3 min</Text>
            <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
            <Text style={styles.cardInfo}>20 min de lectura</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="bar-chart" size={24} color="#061C64" />
          <Text style={styles.menuText}>Progreso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="person" size={24} color="#061C64" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButtonActive}>
          <Ionicons name="book" size={24} color="#fff" />
          <Text style={styles.menuTextActive}>Lecciones</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
