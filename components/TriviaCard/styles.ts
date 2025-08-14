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
    flex: 1, // Cambiado para permitir scroll completo
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15,
    minHeight: height * 0.9,
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
  },
  questionCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    flex: 1,
    position: 'relative',
    minHeight: height * 0.42,
  },
  questionCardWithFeedback: {
    minHeight: height * 0.52,
    paddingBottom: height * 0.12,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: width * 0.042,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: height * 0.02,
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.01,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.03,
    paddingHorizontal: width * 0.02,
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
  },
  correctButton: {
    backgroundColor: '#28A745',
    borderColor: '#28A745',
  },
  incorrectButton: {
    backgroundColor: '#DC3545',
    borderColor: '#DC3545',
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
    backgroundColor: 'rgba(40, 167, 69, 0.2)',
    borderWidth: 1,
    borderColor: '#28A745',
  },
  incorrectFeedback: {
    backgroundColor: 'rgba(220, 53, 69, 0.2)',
    borderWidth: 1,
    borderColor: '#DC3545',
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.034,
    fontWeight: '600',
    marginBottom: height * 0.004,
    textAlign: 'center',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: width * 0.032,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: width * 0.038,
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
    backgroundColor: '#4A4A4A',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#FFFFFF',
    opacity: 0.5,
  },
  multipleChoiceContainer: {
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.01,
    marginBottom: height * 0.02,
  },
  multipleChoiceContainerWithFeedback: {
    marginBottom: height * 0.12,
  },
  multipleChoiceButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: height * 0.02,
  },
  multipleChoiceText: {
    color: '#FFFFFF',
    fontSize: width * 0.038,
    fontWeight: '500',
    textAlign: 'left',
  },
});
