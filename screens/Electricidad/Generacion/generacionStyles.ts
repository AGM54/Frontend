// generacionStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  description: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
    paddingHorizontal: width * 0.02,
  },
  image: {
    width: '100%',
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: height * 0.03,
    marginBottom: height * 0.015,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF7A00',
    borderRadius: 5,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: height * 0.04,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

export default styles;
