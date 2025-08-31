import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

export interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  buttons?: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'destructive' | 'cancel';
  }>;
  onClose?: () => void;
  icon?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  type = 'info',
  buttons = [{ text: 'OK', onPress: () => {} }],
  onClose,
  icon,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getGradientColors = (): [string, string, ...string[]] => {
    switch (type) {
      case 'success':
        return ['#00C851', '#007E33', '#004D1F'];
      case 'error':
        return ['#FF3547', '#CC0000', '#800000'];
      case 'warning':
        return ['#FF8800', '#E65100', '#BF360C'];
      case 'info':
      default:
        return ['#8B45FF', '#6B35D6', '#4A00E0'];
    }
  };

  const getBorderColors = (): [string, string, ...string[]] => {
    switch (type) {
      case 'success':
        return ['#00FF6B', '#00D956', '#00A843'];
      case 'error':
        return ['#FF6B6B', '#FF4757', '#FF3547'];
      case 'warning':
        return ['#FFA726', '#FF9800', '#FF8800'];
      case 'info':
      default:
        return ['#A855F7', '#9333EA', '#7C3AED'];
    }
  };

  const getIconForType = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return '💡';
    }
  };

  const getButtonStyle = (buttonType?: 'default' | 'destructive' | 'cancel'): [string, string] => {
    switch (buttonType) {
      case 'destructive':
        return ['#FF3547', '#CC0000'];
      case 'cancel':
        return ['#6C757D', '#495057'];
      case 'default':
      default:
        return ['#8B45FF', '#6B35D6'];
    }
  };

  const handleBackdropPress = () => {
    onClose?.();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={handleBackdropPress}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <LinearGradient
              colors={getGradientColors()}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalContent}
            >
              {/* Borde animado con degradado */}
              <LinearGradient
                colors={getBorderColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.borderGradient}
              />

              {/* Efectos de brillo */}
              <View style={styles.glowEffect} />
              <View style={styles.innerGlow} />

              {/* Partículas decorativas */}
              <View style={styles.particleContainer}>
                <Text style={[styles.particle, { top: '10%', left: '15%' }]}>✨</Text>
                <Text style={[styles.particle, { top: '20%', right: '10%' }]}>⭐</Text>
                <Text style={[styles.particle, { bottom: '25%', left: '10%' }]}>💫</Text>
                <Text style={[styles.particle, { bottom: '15%', right: '15%' }]}>✨</Text>
              </View>

              {/* Icono principal */}
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{getIconForType()}</Text>
                <View style={styles.iconGlow} />
              </View>

              {/* Título */}
              <Text style={styles.title}>{title}</Text>

              {/* Mensaje */}
              <Text style={styles.message}>{message}</Text>

              {/* Botones */}
              <View style={styles.buttonContainer}>
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      button.onPress();
                      onClose?.();
                    }}
                    style={[styles.button, buttons.length === 1 && styles.singleButton]}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={getButtonStyle(button.style)}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={[
                        styles.buttonText,
                        button.style === 'cancel' && styles.cancelButtonText
                      ]}>
                        {button.text}
                      </Text>
                    </LinearGradient>
                    <View style={styles.buttonGlow} />
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
