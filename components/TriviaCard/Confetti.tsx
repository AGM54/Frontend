import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

type ConfettiPieceProps = {
  color: string;
  x: number;
  delay: number;
  size: number;
};

// Componente estrella bonito y sin errores
const Star: React.FC<{ color: string; size: number }> = ({ color, size }) => {
  return (
    <View style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: size * 0.7,
    }}>
      {/* Glow */}
      <View style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
        opacity: 0.25,
      }} />
      {/* Estrella */}
      <View style={{
        width: size,
        height: size,
        position: 'absolute',
        transform: [{ rotate: '45deg' }],
      }}>
        <View style={{
          position: 'absolute',
          top: size * 0.15,
          left: size * 0.35,
          width: size * 0.3,
          height: size * 0.7,
          backgroundColor: color,
          borderRadius: size * 0.15,
        }} />
        <View style={{
          position: 'absolute',
          top: size * 0.35,
          left: size * 0.15,
          width: size * 0.7,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: size * 0.15,
        }} />
      </View>
    </View>
  );
};

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ color, x, delay, size }) => {
  const position = useRef(new Animated.ValueXY({ x, y: -40 })).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(position.y, {
          toValue: height * 0.45,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 360,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x + width / 2,
        top: 0,
        transform: [
          { translateY: position.y },
          {
            rotate: rotation.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            }),
          },
          { scale },
        ],
      }}
    >
      <Star color={color} size={size} />
    </Animated.View>
  );
};

export const Confetti: React.FC = () => {
  const colors = ['#58CCF7', '#FFD700', '#FF69B4', '#FF7A00', '#FFF', '#A020F0', '#28A745'];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * width - width / 1.2,
    delay: Math.random() * 700,
    size: 22 + Math.random() * 18,
  }));

  return (
    <View style={styles.container}>
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  // Removed confetti style, now using custom star shapes
});