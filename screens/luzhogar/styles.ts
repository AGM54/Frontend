import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
  },
  scrollContent: {
    paddingBottom: height * 0.35, // Más espacio para evitar sobreposición con elementos fijos
  },
  fixedBottom: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? height * 0.12 : height * 0.1, // Más arriba para evitar sobreposición
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.025,
    paddingTop: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: height * 0.025,
    textAlign: 'center',
    paddingHorizontal: width * 0.04,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '700',
      },
    }),
  },
  image: {
    width: width * 0.65,
    height: width * 0.45,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.015,
  },
  imageCinco: {
    width: width * 0.95,
    height: width * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.025,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.4)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  descriptionCard: {
    borderRadius: 24,
    padding: width * 0.06,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.02,
    maxHeight: height * 0.5,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.4)',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  descriptionScroll: {
    maxHeight: height * 0.5,
  },
  description: {
    fontSize: width * 0.044,
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: width * 0.072,
    letterSpacing: 0.3,
    fontWeight: '500',
    zIndex: 10,
    textAlignVertical: 'top',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        textAlignVertical: 'top',
      },
    }),
  },
  progressBarContainer: {
    height: height * 0.01,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.02,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#58CCF7',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    backgroundColor: 'rgba(28, 28, 28, 0.8)',
    borderRadius: 20,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  circle: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    marginHorizontal: width * 0.008,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeCircle: {
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    backgroundColor: '#58CCF7',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.1,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: width * 0.08,
    borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  finishButton: {
    backgroundColor: '#28A745',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.046,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
    }),
  },
  disabledButton: {
    backgroundColor: '#666666',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#FFFFFF',
    opacity: 0.5,
  },
  curiousFact: {
    backgroundColor: '#2A4B7C',
    borderRadius: 16,
    padding: width * 0.05,
    marginTop: height * 0.015,
    borderWidth: 2,
    borderColor: '#58CCF7',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  curiousFactText: {
    fontSize: width * 0.048,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.8,
    lineHeight: width * 0.065,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '700',
      },
    }),
  },
  lightningIcon: {
    fontSize: width * 0.06,
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  glassmorphicOverlay: {
    flex: 1,
    borderRadius: 20,
    padding: width * 0.05,
    position: 'relative',
  },
  sparkleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  sparkle: {
    position: 'absolute',
    fontSize: width * 0.03,
    opacity: 0.6,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      },
      android: {
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
      },
    }),
  },
  curiousFactGradient: {
    borderRadius: 20,
    padding: width * 0.08,
    borderWidth: 3,
    borderColor: 'rgba(139, 69, 255, 0.8)',
    marginHorizontal: width * 0.02,
    marginVertical: height * 0.02,
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  gradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
