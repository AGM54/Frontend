
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification,
  AuthError 
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateFormData = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { name, email, password, confirm } = formData;

    if (!name.trim() || !email.trim() || !password || !confirm) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }

    return true;
  };

  const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado. Prueba con otro email.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Usa al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El formato del email no es válido.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet.';
      default:
        return error.message;
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { name, email, password } = formData;
      
      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email.trim().toLowerCase(), 
        password
      );

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      // Enviar email de verificación
      await sendEmailVerification(userCredential.user, {
        url: 'https://cnee-educa.firebaseapp.com', // URL de tu app
        handleCodeInApp: true,
      });

      Alert.alert(
        'Registro Exitoso', 
        `¡Hola ${name}! Tu cuenta ha sido creada. Se ha enviado un email de verificación a ${email}. Por favor, verifica tu email antes de continuar.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // El usuario puede seguir usando la app pero con limitaciones
              // o puedes cerrar sesión hasta que verifique
              navigation.navigate('Login');
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error en registro:', error);
      const errorMessage = getErrorMessage(error as AuthError);
      Alert.alert('Error de Registro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToLogin = (): void => {
    if (!isLoading) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subtitle}>Ingresa tu nombre, correo y contraseña</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#ccc"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
          editable={!isLoading}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text)}
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña (mín. 6 caracteres)"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => updateFormData('password', text)}
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={formData.confirm}
          onChangeText={(text) => updateFormData('confirm', text)}
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.registerButton, isLoading && { opacity: 0.7 }]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.loginRedirect}>
        ¿Ya tienes una cuenta?{' '}
        <Text
          onPress={handleNavigateToLogin}
          style={[styles.link, isLoading && { opacity: 0.5 }]}>
          Iniciar Sesión
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;