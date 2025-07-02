// src/screens/Profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './styles';


export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        {/* Aquí puedes agregar más componentes del perfil */}
      </View>
    </SafeAreaView>
  );
}
