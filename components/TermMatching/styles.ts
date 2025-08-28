import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: width * 0.05,
    paddingBottom: height * 0.12, // Espacio para la barra de navegación inferior
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02,
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
  score: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#58CCF7',
    textAlign: 'center',
    marginBottom: height * 0.025,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  termsSection: {
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02,
    textShadowColor: 'rgba(139, 69, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.02,
  },
  termCard: {
    width: width * 0.42,
    height: height * 0.22,
    marginBottom: height * 0.015,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  selectedTermCard: {
    transform: [{ scale: 1.05 }],
    ...Platform.select({
      ios: {
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  termCardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.03,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.5)',
  },
  termImageContainer: {
    width: width * 0.22,
    height: width * 0.16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  termImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
  termEmoji: {
    fontSize: width * 0.06,
    marginBottom: height * 0.008,
  },
  termText: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  selectedIndicator: {
    position: 'absolute',
    top: -height * 0.02,
    right: width * 0.02,
    backgroundColor: 'transparent',
  },
  selectedIndicatorText: {
    fontSize: width * 0.04,
    color: '#FFD700',
  },
  definitionsSection: {
    marginBottom: height * 0.02,
  },
  definitionsContainer: {
    paddingHorizontal: width * 0.02,
  },
  definitionCard: {
    marginBottom: height * 0.015,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  matchedDefinitionCard: {
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  definitionCardGradient: {
    padding: width * 0.04,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.3)',
    minHeight: height * 0.08,
    justifyContent: 'center',
  },
  definitionText: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: width * 0.055,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  checkMark: {
    position: 'absolute',
    top: width * 0.02,
    right: width * 0.02,
    width: width * 0.06,
    height: width * 0.06,
    backgroundColor: '#28A745',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  checkMarkText: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  completionMessage: {
    marginTop: height * 0.02,
    padding: width * 0.05,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#28A745',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  completionTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#28A745',
    textAlign: 'center',
    marginBottom: height * 0.01,
    textShadowColor: 'rgba(40, 167, 69, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  completionText: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  modalContainer: {
    width: width * 0.9,
    borderRadius: 25,
    padding: width * 0.06,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(139, 69, 255, 0.8)',
    ...Platform.select({
      ios: {
        shadowColor: '#8B45FF',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 1,
        shadowRadius: 25,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02,
    textShadowColor: 'rgba(139, 69, 255, 1)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  modalMessage: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: width * 0.065,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.02,
  },
  modalButton: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 255, 0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalButtonGradient: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
});
