import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.08,
  },
  scrollContent: {
    paddingBottom: height * 0.02,
  },
  fixedBottom: {
    backgroundColor: '#000000',
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.015,
    paddingTop: height * 0.01,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: height * 0.03,
    textAlign: 'center',
    paddingHorizontal: width * 0.04,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '700',
      },
    }),
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  imageCinco: {
    width: width * 0.95,
    height: width * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  descriptionCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 24,
    padding: width * 0.07,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.015,
    maxHeight: height * 0.55,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  descriptionScroll: {
    maxHeight: height * 0.5,
  },
  description: {
    fontSize: width * 0.044,
    color: '#FFFFFF',
    textAlign: 'justify',
    lineHeight: width * 0.072,
    letterSpacing: 0.3,
    textAlignVertical: 'top',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        textAlignVertical: 'top',
      },
    }),
  },
  progressBarContainer: {
    height: height * 0.01,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.02,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#58CCF7',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.025,
    backgroundColor: '#1C1C1C',
    borderRadius: 30,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  circle: {
    width: width * 0.035,
    height: width * 0.035,
    borderRadius: width * 0.0175,
    marginHorizontal: width * 0.015,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  activeCircle: {
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    backgroundColor: '#58CCF7',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.1,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: width * 0.08,
    borderWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#58CCF7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  finishButton: {
    backgroundColor: '#28A745',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.046,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
    }),
  },
});
