import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
    padding: width * 0.06,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.025,
    textAlign: 'center',
    paddingHorizontal: width * 0.04,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  image: {
    width: width * 0.65,
    height: width * 0.65,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: height * 0.025,
    marginTop: height * 0.01,
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: width * 0.05,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.02,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  description: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: width * 0.065,
  },
  progressBarContainer: {
    height: height * 0.012,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: height * 0.025,
    marginHorizontal: width * 0.02,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF7A00',
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  circle: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015,
    marginHorizontal: width * 0.015,
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.08,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: width * 0.1,
    marginTop: height * 0.01,
    ...Platform.select({
      ios: {
        shadowColor: '#FF7A00',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});