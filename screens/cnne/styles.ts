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
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: height * 0.02,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});