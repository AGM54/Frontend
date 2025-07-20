import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061C64',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  title: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.015,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.015,
  },
  horizontalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  atomImage: {
    width: width * 0.6,
    height: width * 0.6,
  },
  atom: {
    width: width * 0.25,
    height: width * 0.08,
    backgroundColor: '#FDDFA0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  atomText: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  placed: {
    backgroundColor: '#00C853',
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginHorizontal: width * 0.25,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  dropBox: {
    width: width * 0.25,
    height: width * 0.08,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  dropBoxEmpty: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF7A00',
  },
  dropBoxPlaced: {
    backgroundColor: '#C8E6C9',
    borderColor: '#00C853',
  },
});