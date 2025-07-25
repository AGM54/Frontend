
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.config';
import { RootStackParamList } from '../types/types';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ElectricidadScreen from '../screens/Electricidad/ElectricidadScreen';
import ElectronLessonScreen from '../screens/Electricidad/ElectronLessonScreen';
import GeneracionScreen from '../screens/Electricidad/Generacion/generacion';
import BottomTabNavigator from './BottomTabNavigator';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import ForgotPasswordScreen from '../screens/ForgontPassword/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Usuario autenticado - mostrar pantallas protegidas
          <>
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
            <Stack.Screen name="Electricidad" component={ElectricidadScreen} />
            <Stack.Screen name="ElectronLesson" component={ElectronLessonScreen} />
            <Stack.Screen name="Generacion" component={GeneracionScreen} />
          </>
        ) : (
          // Usuario no autenticado - mostrar pantallas de auth
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default AppNavigator;