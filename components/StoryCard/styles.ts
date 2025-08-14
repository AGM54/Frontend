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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  
  questionNumber: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  
  optionsContainer: {
    marginVertical: 10,
  },
  
  optionButton: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
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
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  
  selectedOptionText: {
    fontWeight: 'bold',
  },
  
  checkMark: {
    fontSize: 18,
    marginLeft: 10,
  },
  
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  
  nextButton: {
    backgroundColor: '#58CCF7',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Final screen styles
  finalText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 20,
    fontWeight: '500',
  },
  
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58CCF7',
    textAlign: 'center',
    marginBottom: 30,
  },
  
  sabiasQueButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
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
    fontSize: 18,
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
    padding: 30,
    margin: 20,
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
    marginBottom: 20,
  },
  
  sabiasQueText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  
  closeButton: {
    backgroundColor: '#58CCF7',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
