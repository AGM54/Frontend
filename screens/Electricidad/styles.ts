import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
  },
  container: {
    padding: width * 0.06,
    paddingBottom: height * 0.18,
  },
  headerCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },
  logoCentered: {
    width: width * 0.3,
    height: height * 0.09,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  titleCentered: {
    color: '#fff',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: width * 0.045,
    marginBottom: height * 0.04,
  },
  lessonCardGradient: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lessonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.055,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  duration: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  lessonImageSide: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bottomMenuGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: '#fff', // blanco
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    color: '#061C64',
    fontSize: 12,
    marginTop: 4,
  },
  menuTextActive: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
