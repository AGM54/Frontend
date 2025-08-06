import { StyleSheet, Dimensions } from 'react-native';

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
  },
  image: {
    width: width * 0.65,
    height: width * 0.65,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: height * 0.025,
    marginTop: height * 0.01,
  },
  description: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.08,
    lineHeight: width * 0.065,
    marginHorizontal: width * 0.02,
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
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.1,
    marginTop: height * 0.01,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});