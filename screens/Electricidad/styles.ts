// src/screens/Electricidad/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.25, // Más espacio para evitar sobreposición con elementos fijos
  },

  // Header con saludo y logo
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
    marginBottom: height * 0.03,
  },

  greeting: {
    fontSize: width * 0.045,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },

  username: {
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },

  wave: {
    fontSize: width * 0.045,
    fontFamily: 'Inter_400Regular',
  },

  logo: {
    width: width * 0.25,
    height: height * 0.08,
    resizeMode: 'contain',
  },

  // Título centrado
  headerCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },

  titleCentered: {
    color: '#fff',
    fontSize: width * 0.07,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },

  description: {
    color: '#fff',
    fontSize: width * 0.045,
    fontFamily: 'Inter_400Regular',
    marginBottom: height * 0.04,
    textAlign: 'center',
  },

  // Tarjetas
  lessonCardGradient: {
    borderRadius: 16,
    padding: width * 0.04,
    marginBottom: height * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.03,
  },

  lessonTitle: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: width * 0.05,
    marginBottom: height * 0.01,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
    marginBottom: height * 0.015,
  },

  duration: {
    color: '#fff',
    fontSize: width * 0.04,
    fontFamily: 'Inter_400Regular',
  },

  lessonImageSide: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },

  // Menú inferior
  bottomMenuGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingBottom: height * 0.03,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
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
    fontSize: width * 0.035,
    fontFamily: 'Inter_400Regular',
    marginTop: height * 0.005,
  },

  menuTextActive: {
    color: '#fff',
    fontSize: width * 0.035,
    fontFamily: 'Inter_700Bold',
    marginTop: height * 0.005,
  },
});
