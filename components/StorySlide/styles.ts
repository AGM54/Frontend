import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 28,
    padding: width * 0.04,
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.015,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  slideCounter: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.12,
  },
  slideCard: {
    borderRadius: 20,
    padding: width * 0.05,
    marginBottom: height * 0.03,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.2)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  slideTitle: {
    color: '#58CCF7',
    fontSize: width * 0.05,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.025,
    textShadowColor: 'rgba(88, 204, 247, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageContainer: {
    marginBottom: height * 0.025,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  storyImage: {
    width: '100%',
    height: height * 0.45, // Más altura para evitar cortes
    borderRadius: 15,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontSize: width * 0.042,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.02,
  },
  continueButton: {
    marginTop: height * 0.02,
    marginHorizontal: width * 0.02,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#58CCF7',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: height * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    minHeight: height * 0.07,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
