import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061C64',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  logo: {
    position: 'absolute',
    top: height * 0.05,
    width: width * 0.3,
    height: height * 0.06,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.065,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#ccc',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.03,
    height: height * 0.06,
  },
  icon: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: width * 0.04,
  },
  registerButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  loginRedirect: {
    color: '#ccc',
    marginTop: height * 0.02,
    textAlign: 'center',
    fontSize: width * 0.035,
  },
  link: {
    color: '#FF7A00',
    fontWeight: 'bold',
  },
});

export default styles;
