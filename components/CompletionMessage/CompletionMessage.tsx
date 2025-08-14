import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

interface CompletionMessageProps {
  title: string;
  message: string;
  score?: string;
  onContinue: () => void;
  buttonText?: string;
}

export default function CompletionMessage({
  title,
  message,
  score,
  onContinue,
  buttonText = 'Continuar',
}: CompletionMessageProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Primera fase: entrada del contenedor
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Segunda fase: texto deslizante
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      // Tercera fase: icono giratorio
      Animated.spring(iconAnim, {
        toValue: 1,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }),
      // Cuarta fase: sparkles
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const SparkleIcon = ({ style }: { style: any }) => (
    <Animated.View style={style}>
      <Ionicons name="sparkles" size={16} color="#FFD700" />
    </Animated.View>
  );

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {/* Sparkles decorativos */}
          <SparkleIcon
            style={[
              styles.sparkle1,
              {
                opacity: sparkleAnim,
                transform: [
                  {
                    rotate: sparkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          <SparkleIcon
            style={[
              styles.sparkle2,
              {
                opacity: sparkleAnim,
                transform: [
                  {
                    rotate: sparkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['360deg', '0deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          <SparkleIcon
            style={[
              styles.sparkle3,
              {
                opacity: sparkleAnim,
                transform: [
                  {
                    scale: sparkleAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.5, 1.2, 0.8],
                    }),
                  },
                ],
              },
            ]}
          />

          {/* Icono principal */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  { scale: iconAnim },
                  {
                    rotate: iconAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={['#58CCF7', '#4A9FE7']}
              style={styles.iconGradient}
            >
              <Ionicons name="checkmark-circle" size={60} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>

          {/* Título */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
          </Animated.View>

          {/* Mensaje */}
          <Animated.View
            style={[
              styles.messageContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, 25],
                    }),
                  },
                ],
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.message}>{message}</Text>
          </Animated.View>

          {/* Score opcional */}
          {score && (
            <Animated.View
              style={[
                styles.scoreContainer,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 15],
                      }),
                    },
                  ],
                  opacity: fadeAnim,
                },
              ]}
            >
              <LinearGradient
                colors={['rgba(88, 204, 247, 0.2)', 'rgba(74, 159, 231, 0.2)']}
                style={styles.scoreGradient}
              >
                <Text style={styles.scoreText}>{score}</Text>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Botón de continuar */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, 10],
                    }),
                  },
                ],
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableOpacity style={styles.button} onPress={onContinue}>
              <LinearGradient
                colors={['#58CCF7', '#4A9FE7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
