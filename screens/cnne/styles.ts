import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
  },
  scrollContent: {
    paddingBottom: height * 0.2, // Reducido para que el botón esté más arriba
  },
  fixedBottom: {
    position: 'absolute',
    bottom: height * 0.09,
    left: width * 0.04,
    right: width * 0.04,
    paddingHorizontal: width * 0.02,
    paddingBottom: height * 0.01,
    paddingTop: height * 0.01,
    backgroundColor: 'rgba(45,27,77,0.85)',
    borderRadius: 18,
    width: '92%',
    alignSelf: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: height * 0.03,
    textAlign: 'center',
    paddingHorizontal: width * 0.04,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
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
  image: {
    width: width * 0.75, // Reducido de 0.8 a 0.75
    height: width * 0.5,  // Reducido de 0.6 a 0.5
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.015, // Menos margen superior
    marginBottom: height * 0.015, // Menos margen inferior
  },
  imageCinco: {
    width: width * 0.95,
    height: width * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  descriptionCard: {
    borderRadius: 24,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.015,
    maxHeight: height * 0.45, // Reducido para dar más espacio al botón
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
    descriptionCardLarge: {
      borderRadius: 24,
      marginBottom: height * 0.02,
      marginHorizontal: width * 0.015,
      maxHeight: height * 0.78, // Mucho más alto para mostrar toda la info
      minHeight: height * 0.45,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 15,
        },
        android: {
          elevation: 8,
        },
      }),
    },
  gradientBorder: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 255, 0.3)',
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  sparkle: {
    position: 'absolute',
    fontSize: width * 0.04,
    color: 'rgba(139, 69, 255, 0.6)',
  },
  descriptionScroll: {
    maxHeight: height * 0.40, // Reducido para dar más espacio al botón
    padding: width * 0.07,
  },
  descriptionScrollLarge: {
    minHeight: height * 0.40,
    padding: width * 0.05,
    paddingBottom: height * 0.04,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.044,
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: width * 0.072,
    letterSpacing: 0.3,
    textAlignVertical: 'top',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        textAlignVertical: 'top',
      },
    }),
  },
  progressBarContainer: {
    height: height * 0.01,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: height * 0.01, // Reducido de 0.015 a 0.01
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
    marginBottom: height * 0.01, // Reducido de 0.025 a 0.01
    paddingVertical: height * 0.005, // Reducido
  },
  circle: {
    width: width * 0.035,
    height: width * 0.035,
    borderRadius: width * 0.0175,
    marginHorizontal: width * 0.015,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
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
    backgroundColor: 'rgba(88, 204, 247, 0.4)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(88, 204, 247, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  disabledButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
  },
});
