import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiPieceProps {
  color: string;
  x: number;
  delay: number;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ color, x, delay }) => {
  const position = useRef(new Animated.ValueXY({ x, y: -20 })).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(position.y, {
          toValue: height * 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 360,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: color,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            {
              rotate: rotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
            { scale },
          ],
        },
      ]}
    />
  );
};

export const Confetti: React.FC = () => {
  const colors = ['#58CCF7', '#28A745', '#FFD700', '#FF69B4', '#FF7A00'];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * width - width / 2,
    delay: Math.random() * 500,
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
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});