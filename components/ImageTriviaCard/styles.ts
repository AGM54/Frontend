import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  triviaContainer: {
    borderRadius: 28,
    padding: width * 0.04,
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.015,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
    flex: 1, // Cambiado a flex para permitir scroll completo
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  questionNumber: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '600',
    opacity: 0.8,
  },
  scoreText: {
    color: '#58CCF7',
    fontSize: width * 0.04,
    fontWeight: '600',
    textShadowColor: 'rgba(88, 204, 247, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15, // Suficiente espacio para el botón
    minHeight: height * 0.9, // Asegura altura mínima para scroll
  },
  questionCard: {
    borderRadius: 20,
    padding: width * 0.04,
    marginBottom: height * 0.02,
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
  activityTitle: {
    color: '#58CCF7',
    fontSize: width * 0.042,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.025,
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.02,
    textShadowColor: 'rgba(88, 204, 247, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 0.025,
    borderRadius: 20,
    padding: width * 0.04,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.4)',
    overflow: 'hidden',
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
  situationImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  situationText: {
    color: '#FFFFFF',
    fontSize: width * 0.046,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.02,
    lineHeight: width * 0.06,
    paddingHorizontal: width * 0.02,
  },
  questionText: {
    color: '#58CCF7',
    fontSize: width * 0.044,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.025,
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.02,
    textShadowColor: 'rgba(88, 204, 247, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.025,
    paddingHorizontal: width * 0.02,
  },
  answersContainerWithFeedback: {
    marginBottom: height * 0.12,
  },
  answerButton: {
    width: '48%',
    height: height * 0.08,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: width * 0.042,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedAnswerText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  correctButton: {
    borderColor: '#28A745',
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  incorrectButton: {
    borderColor: '#DC3545',
    ...Platform.select({
      ios: {
        shadowColor: '#DC3545',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  feedbackContainer: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderRadius: 15,
    marginHorizontal: width * 0.02,
    marginTop: height * 0.025,
    minHeight: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  correctFeedback: {
    borderColor: '#28A745',
  },
  incorrectFeedback: {
    borderColor: '#DC3545',
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '700',
    marginBottom: height * 0.008,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: width * 0.037,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: width * 0.048,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#58CCF7',
    paddingVertical: height * 0.025,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.025,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.02,
    alignSelf: 'center',
    width: '96%',
    minHeight: height * 0.07,
    borderWidth: 2,
    borderColor: '#58CCF7',
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  disabledButton: {
    borderColor: '#666666',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#FFFFFF',
    opacity: 0.5,
  },
});
