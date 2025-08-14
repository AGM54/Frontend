import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: width * 0.9,
    maxHeight: height * 0.7,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.5)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  gradientContainer: {
    padding: width * 0.08,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    marginBottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  textContainer: {
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(88, 204, 247, 0.8)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  messageContainer: {
    marginBottom: height * 0.025,
    paddingHorizontal: width * 0.02,
  },
  message: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: width * 0.065,
    letterSpacing: 0.3,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  scoreContainer: {
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  scoreGradient: {
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scoreText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#58CCF7',
    textAlign: 'center',
    textShadowColor: 'rgba(88, 204, 247, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: width * 0.6,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: width * 0.048,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: width * 0.02,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  // Sparkles positions
  sparkle1: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.15,
  },
  sparkle2: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.12,
  },
  sparkle3: {
    position: 'absolute',
    bottom: height * 0.15,
    left: width * 0.1,
  },
});
