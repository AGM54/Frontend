// navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator'; 
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProgressScreen from '../screens/Progress/ProgressScreen';

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
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Progress') iconName = 'bar-chart';
          else if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#061C64',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}