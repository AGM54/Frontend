import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subtitle}>Ingresa tu nombre, correo y contraseña</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Vuelve a ingresar la contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.loginRedirect}>
        ¿Ya tienes una cuenta?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.link}>
          Iniciar
        </Text>
      </Text>
    </View>
  );
}
