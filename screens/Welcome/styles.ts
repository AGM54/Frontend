import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#061C64',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.08,
    resizeMode: 'contain',
    marginBottom: height * 0.01,
  },
  character: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.05,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.08,
    borderRadius: 50,
    elevation: 4,
  },
  rightButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.08,
    borderRadius: 50,
    elevation: 4,
  },
  leftButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  rightButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
