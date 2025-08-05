import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sendPasswordResetEmail, AuthError } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { RootStackParamList } from '../../types/types';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ForgotPasswordScreenStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu email.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email Inválido', 'Por favor, ingresa un email válido.');
      return false;
    }

    return true;
  };

  const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No existe una cuenta con este email.';
      case 'auth/invalid-email':
        return 'El formato del email no es válido.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta más tarde.';
      default:
        return 'Ocurrió un error. Intenta nuevamente.';
    }
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase(), {
        url: 'https://cnee-educa.firebaseapp.com',
        handleCodeInApp: false,
      });

      Alert.alert(
        'Email Enviado',
        `Se ha enviado un enlace para restablecer tu contraseña a ${email}. Revisa tu bandeja de entrada y spam.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      console.error('Error enviando email de recuperación:', error);
      const errorMessage = getErrorMessage(error as AuthError);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Text style={styles.subtitle}>
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
        </Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.resetButton, isLoading && { opacity: 0.7 }]} 
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>Enviar Email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={[styles.backToLoginText, isLoading && { opacity: 0.5 }]}>
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



export default ForgotPasswordScreen;