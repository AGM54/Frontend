import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64', // mismo azul que Welcome
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#061C64',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.08,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.08,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#ccc',
    marginBottom: height * 0.03,
  },
  inputWrapper: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingHorizontal: 20,
    width: '100%',
    height: height * 0.065,
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  input: {
    fontSize: width * 0.04,
    color: '#000',
  },
  forgotText: {
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: height * 0.015,
  },
  loginRedirect: {
    color: '#fff',
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
});
