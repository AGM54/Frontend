import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.15,
  },
  storyTitle: {
    fontSize: width * 0.065,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.015,
    textShadowColor: 'rgba(139, 69, 255, 1)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  slideNumber: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#58CCF7',
    textAlign: 'center',
    marginBottom: height * 0.025,
    textShadowColor: 'rgba(88, 204, 247, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  slideCard: {
    borderRadius: 25,
    padding: width * 0.06,
    marginBottom: height * 0.02,
    borderWidth: 3,
    borderColor: 'rgba(139, 69, 255, 0.8)',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  slideTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.025,
    textShadowColor: 'rgba(139, 69, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  comicFrame: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: width * 0.04,
    marginBottom: height * 0.03,
    borderWidth: 4,
    borderColor: '#8B45FF',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  comicImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 15,
    marginBottom: height * 0.02,
    backgroundColor: 'rgba(139, 69, 255, 0.1)',
  },
  comicImageLarge: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 69, 255, 0.05)',
  },
  speechBubble: {
    borderRadius: 18,
    padding: width * 0.04,
    borderWidth: 2,
    borderColor: '#8B45FF',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: width * 0.08,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#8B45FF',
  },
  dialogueText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#1a0033',
    textAlign: 'center',
    lineHeight: width * 0.065,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  nextSlideButton: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  nextSlideButtonGradient: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  nextSlideButtonText: {
    fontSize: width * 0.048,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: width * 0.02,
  },
  dot: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#58CCF7',
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: width * 0.02,
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
