// navigation/MainStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ElectricidadScreen from '../screens/Electricidad/ElectricidadScreen';
import CnneScreen from '../screens/cnne/CnneScreen';
import LuzHogarScreen from '../screens/luzhogar/LuzHogarScreen';
import PreciosFacturaScreen from '../screens/preciosfactura/PreciosFacturaScreen';
import ObligacionesScreen from '../screens/obligaciones/ObligacionesScreen';
import AlumbradoScreen from '../screens/alumbrado/AlumbradoScreen';

export type MainStackParamList = {
  HomeMain: undefined;
  Electricidad: undefined;
  Cnne: undefined;
  LuzHogar: undefined;
  PreciosFactura: undefined;
  Obligaciones: undefined;
  Alumbrado: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Electricidad" component={ElectricidadScreen} />
      <Stack.Screen name="Cnne" component={CnneScreen} />
      <Stack.Screen name="LuzHogar" component={LuzHogarScreen} />
      <Stack.Screen name="PreciosFactura" component={PreciosFacturaScreen} />
      <Stack.Screen name="Obligaciones" component={ObligacionesScreen} />
      <Stack.Screen name="Alumbrado" component={AlumbradoScreen} />
    </Stack.Navigator>
  );
}
