import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
triviaContainer: {
  flex: 1, 
  backgroundColor: '#1C1C1C',
  borderRadius: 24,
  padding: width * 0.04,
  marginBottom: height * 0.01,
  marginHorizontal: width * 0.015,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.08)',
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.02,
  },
  questionCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  activityTitle: {
    color: '#58CCF7',
    fontSize: width * 0.038,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.02,
    lineHeight: width * 0.048,
    paddingHorizontal: width * 0.02,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
    backgroundColor: 'rgba(88, 204, 247, 0.1)',
    borderRadius: 16,
    padding: width * 0.04,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
  },
  situationImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  situationText: {
    color: '#FFFFFF',
    fontSize: width * 0.044,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.015,
    lineHeight: width * 0.055,
    paddingHorizontal: width * 0.02,
  },
  questionText: {
    color: '#58CCF7',
    fontSize: width * 0.042,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.02,
    lineHeight: width * 0.052,
    paddingHorizontal: width * 0.02,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  answersContainerWithFeedback: {
    marginBottom: height * 0.12,
  },
  answerButton: {
    backgroundColor: '#1C1C1C',
    width: '48%',
    paddingVertical: height * 0.02,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#58CCF7',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  incorrectButton: {
    backgroundColor: '#DC3545',
    borderColor: '#DC3545',
    ...Platform.select({
      ios: {
        shadowColor: '#DC3545',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  feedbackContainer: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderRadius: 12,
    marginHorizontal: width * 0.02,
    marginTop: height * 0.02,
    minHeight: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  correctFeedback: {
    backgroundColor: 'rgba(40, 167, 69, 0.25)',
    borderWidth: 2,
    borderColor: '#28A745',
  },
  incorrectFeedback: {
    backgroundColor: 'rgba(220, 53, 69, 0.25)',
    borderWidth: 2,
    borderColor: '#DC3545',
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.038,
    fontWeight: '700',
    marginBottom: height * 0.008,
    textAlign: 'center',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: width * 0.042,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#58CCF7',
    paddingVertical: height * 0.020,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    width: '100%',
    borderWidth: 2,
    borderColor: '#4A9FE7',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#4A4A4A',
    borderColor: '#666666',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#FFFFFF',
    opacity: 0.5,
  },
});
