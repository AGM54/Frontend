import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  triviaContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 24,
    padding: width * 0.05,
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.015,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    minHeight: height * 0.75,
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
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
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'justify',
    marginBottom: height * 0.025,
    lineHeight: width * 0.06,
    paddingHorizontal: width * 0.02,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.03,
    paddingHorizontal: width * 0.02,
  },
  answerButton: {
    backgroundColor: '#1C1C1C',
    width: '48%',
    paddingVertical: height * 0.02,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    padding: width * 0.04,
    borderRadius: 12,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.02,
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
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    textAlign: 'justify',
    opacity: 0.9,
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.01,
  },
  continueButton: {
    backgroundColor: '#58CCF7',
    paddingVertical: height * 0.018,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#4A4A4A',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#FFFFFF',
    opacity: 0.5,
  },
});