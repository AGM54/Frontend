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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Buenas tardes, <Text style={styles.username}>David</Text>{' '}
          <Text style={styles.wave}>👋</Text>
        </Text>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Primera Tarjeta con navegación */}
        <TouchableOpacity onPress={() => navigation.navigate('Electricidad')} style={styles.cardPrimary}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
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
            <Image source={require('../../assets/foco.png')} style={styles.cardImageRight} />
          </View>
        </TouchableOpacity>

        {/* Tabs visuales (sin navegación) */}
        <View style={styles.tabGroup}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabActiveText}>Lecciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Progreso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Glosario</Text>
          </TouchableOpacity>
        </View>

        {/* Segunda Tarjeta */}
        <View style={styles.cardSecondary}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.cardTitle}>¿Qué es la CNEE?</Text>
              <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>
              <View style={styles.cardInfoRow}>
                <Ionicons name="play-circle" size={18} color="#000" />
                <Text style={styles.cardInfo}>3 min</Text>
                <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
                <Text style={styles.cardInfo}>20 min de lectura</Text>
              </View>
            </View>
            <Image source={require('../../assets/personatarjeta.png')} style={styles.cardImageRight} />
          </View>
        </View>

        {/* Tercera Tarjeta */}
        <View style={styles.cardSecondary}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.cardTitle}>Transmisión de electricidad</Text>
              <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>
              <View style={styles.cardInfoRow}>
                <Ionicons name="play-circle" size={18} color="#000" />
                <Text style={styles.cardInfo}>3 min</Text>
                <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
                <Text style={styles.cardInfo}>25 min de lectura</Text>
              </View>
            </View>
            <Image source={require('../../assets/transmision.png')} style={styles.cardImageRight} />
          </View>
        </View>

        {/* Cuarta Tarjeta */}
        <View style={styles.cardSecondary}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.cardTitle}>Distribución y lectura de facturas</Text>
              <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>
              <View style={styles.cardInfoRow}>
                <Ionicons name="play-circle" size={18} color="#000" />
                <Text style={styles.cardInfo}>3 min</Text>
                <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
                <Text style={styles.cardInfo}>15 min de lectura</Text>
              </View>
            </View>
            <Image source={require('../../assets/facturaa.png')} style={styles.cardImageRight} />
          </View>
        </View>

        {/* Quinta Tarjeta - CNEE con navegación */}
        <TouchableOpacity onPress={() => navigation.navigate('Cnne')} style={styles.cardSecondary}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.cardTitle}>¿Qué es la CNEE?</Text>
              <Text style={styles.cardSubtitle}>Descúbrelo aquí</Text>
              <View style={styles.cardInfoRow}>
                <Ionicons name="play-circle" size={18} color="#000" />
                <Text style={styles.cardInfo}>3 min</Text>
                <Ionicons name="book" size={18} color="#000" style={{ marginLeft: 12 }} />
                <Text style={styles.cardInfo}>10 min de lectura</Text>
              </View>
            </View>
            <Image source={require('../../assets/cnee.png')} style={styles.cardImageRight} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
