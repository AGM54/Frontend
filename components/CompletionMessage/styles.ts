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
    width: width * 0.95,
    maxHeight: height * 0.85,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'rgba(139, 69, 255, 1)',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 1,
        shadowRadius: 40,
      },
      android: {
        elevation: 25,
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
    fontSize: width * 0.09,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(139, 69, 255, 1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
    marginVertical: height * 0.02,
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
    fontSize: width * 0.055,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: width * 0.08,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(139, 69, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginVertical: height * 0.03,
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
    width: width * 0.8,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(139, 69, 255, 0.8)',
    marginTop: height * 0.02,
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
  buttonGradient: {
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: width * 0.058,
    fontWeight: '800',
    color: '#FFFFFF',
    marginRight: width * 0.02,
    textShadowColor: 'rgba(139, 69, 255, 0.8)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    letterSpacing: 1,
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
