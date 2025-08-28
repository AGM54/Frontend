import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#000000',
  },
  
  // Story styles
  storyTitle: {
    fontSize: width * 0.065,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    textShadowColor: 'rgba(88, 204, 247, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  
  slideNumber: {
    fontSize: width * 0.04,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: height * 0.03,
    fontWeight: '500',
  },
  
  slideCard: {
    borderRadius: 25,
    padding: width * 0.05,
    marginHorizontal: width * 0.025,
    marginVertical: height * 0.01,
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.3)',
    alignItems: 'center',
    overflow: 'hidden',
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
  
  slideTitle: {
    fontSize: width * 0.055,
    fontWeight: '700',
    color: '#58CCF7',
    textAlign: 'center',
    marginBottom: height * 0.02,
    textShadowColor: 'rgba(88, 204, 247, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  
  storyImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginVertical: height * 0.025,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  
  slideDescription: {
    fontSize: width * 0.042,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: width * 0.06,
    marginBottom: height * 0.025,
    fontWeight: '500',
    paddingHorizontal: width * 0.02,
  },
  
  nextSlideButton: {
    borderRadius: 20,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.015,
    marginTop: height * 0.015,
    marginBottom: height * 0.02, // Margen normal
    borderWidth: 2,
    borderColor: 'rgba(88, 204, 247, 0.5)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  
  nextSlideButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Trivia styles
  triviaTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: height * 0.0125,
    marginTop: height * 0.025,
  },
  
  questionNumber: {
    fontSize: width * 0.04,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
  
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: width * 0.05,
    margin: width * 0.025,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  questionText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: height * 0.025,
    lineHeight: width * 0.06,
  },
  
  optionsContainer: {
    marginVertical: height * 0.0125,
  },
  
  optionButton: {
    backgroundColor: '#ecf0f1',
    padding: width * 0.0375,
    borderRadius: 10,
    marginVertical: height * 0.00625,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  selectedOption: {
    borderColor: '#58CCF7',
    backgroundColor: '#e3f2fd',
  },
  
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e8',
  },
  
  incorrectOption: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  
  optionText: {
    fontSize: width * 0.04,
    color: '#2c3e50',
    flex: 1,
  },
  
  selectedOptionText: {
    fontWeight: 'bold',
  },
  
  checkMark: {
    fontSize: width * 0.045,
    marginLeft: width * 0.025,
  },
  
  resultContainer: {
    alignItems: 'center',
    marginTop: height * 0.025,
  },
  
  resultText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.019,
  },
  
  nextButton: {
    backgroundColor: '#58CCF7',
    paddingHorizontal: width * 0.075,
    paddingVertical: height * 0.015,
    borderRadius: 25,
  },
  
  nextButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  
  // Final screen styles
  finalText: {
    fontSize: width * 0.04,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: width * 0.06,
    marginVertical: height * 0.025,
    fontWeight: '500',
  },
  
  scoreText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#58CCF7',
    textAlign: 'center',
    marginBottom: height * 0.0375,
  },
  
  sabiasQueButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.019,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: height * 0.025,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  sabiasQueButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.075,
    margin: width * 0.05,
    maxWidth: width * 0.9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  sabiasQueImage: {
    width: width * 0.6,
    height: height * 0.2,
    marginBottom: height * 0.025,
  },
  
  sabiasQueText: {
    fontSize: width * 0.04,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: width * 0.06,
    marginBottom: height * 0.0375,
  },
  
  closeButton: {
    backgroundColor: '#58CCF7',
    paddingHorizontal: width * 0.075,
    paddingVertical: height * 0.015,
    borderRadius: 25,
  },
  
  closeButtonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});
