// navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainStackNavigator from './MainStackNavigator'; 
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';

const { width, height } = Dimensions.get('window');

export type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? height * 0.11 : height * 0.09,
          backgroundColor: 'rgba(28, 28, 28, 0.95)',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopWidth: 1,
          borderTopColor: 'rgba(88, 204, 247, 0.2)',
          paddingTop: height * 0.01,
          paddingBottom: Platform.OS === 'ios' ? height * 0.02 : height * 0.015,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
            android: {
              elevation: 10,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: width * 0.03,
          fontWeight: '600',
          marginTop: height * 0.002,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Progress') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName as any} size={size * 1.1} color={color} />;
        },
        tabBarActiveTintColor: '#58CCF7',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'HOME'
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          tabBarLabel: 'PROGRESO'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'PERFIL'
        }}
      />
    </Tab.Navigator>
  );
}
