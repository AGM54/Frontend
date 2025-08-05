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
import { RootStackParamList } from '../../types/types';
import styles from './styles';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../firebase.config';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateFormData = (field: keyof LoginFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { email, password } = formData;

    if (!email.trim() || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
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
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/invalid-email':
        return 'El formato del email no es válido.';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet.';
      case 'auth/invalid-credential':
        return 'Email o contraseña incorrectos.';
      default:
        return 'Email o contraseña incorrectos.';
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(
        auth, 
        email.trim().toLowerCase(), 
        password
      );
      
      // No necesitas navegar manualmente ni mostrar alert de éxito
      // El AppNavigator detectará automáticamente que el usuario está autenticado
      
    } catch (error) {
      console.error('Error en login:', error);
      const errorMessage = getErrorMessage(error as AuthError);
      Alert.alert('Error de Inicio de Sesión', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = (): void => {
    if (!isLoading) {
      navigation.navigate('Register');
    }
  };

  // const handleForgotPassword = (): void => {
  //   if (!isLoading) {
  //     // Aquí puedes implementar la funcionalidad de recuperar contraseña
  //     Alert.alert(
  //       'Recuperar Contraseña', 
  //       'Funcionalidad próximamente disponible.'
  //     );
  //   }
  // };

    const handleForgotPassword = (): void => {
    if (!isLoading) {
      navigation.navigate('ForgotPassword');
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Inicia Sesión</Text>
        <Text style={styles.subtitle}>¡Bienvenido de nuevo!</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => updateFormData('password', text)}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          disabled={isLoading}
          onPress={handleForgotPassword}
        >
          <Text style={[styles.forgotText, isLoading && { opacity: 0.5 }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <Text style={styles.loginRedirect}>
          ¿No tienes una cuenta?{' '}
          <Text
            onPress={handleNavigateToRegister}
            style={[styles.link, isLoading && { opacity: 0.5 }]}>
            Regístrate
          </Text>
        </Text>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;