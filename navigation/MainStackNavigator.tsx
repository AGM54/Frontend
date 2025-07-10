// navigation/MainStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ElectricidadScreen from '../screens/Electricidad/ElectricidadScreen';

export type MainStackParamList = {
  HomeMain: undefined;
  Electricidad: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Electricidad" component={ElectricidadScreen} />
    </Stack.Navigator>
  );
}