import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: 'transparent',
  },
  instructions: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02,
    fontWeight: '600',
    lineHeight: width * 0.06,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    gap: width * 0.02,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  columnTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#58CCF7',
    marginBottom: height * 0.015,
    textAlign: 'center',
  },
  actionItem: {
    marginBottom: height * 0.01,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  obligationItem: {
    marginBottom: height * 0.01,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedAction: {
    transform: [{ scale: 1.05 }],
  },
  matchedAction: {
    opacity: 0.8,
  },
  correctMatch: {
    elevation: 6,
  },
  incorrectMatch: {
    elevation: 6,
  },
  itemGradient: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    borderRadius: 12,
    minHeight: height * 0.08,
    justifyContent: 'center',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: width * 0.035,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: width * 0.045,
  },
  completionMessage: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.1,
    right: width * 0.1,
    zIndex: 1000,
  },
  completionCard: {
    padding: width * 0.06,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  completionText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: height * 0.01,
  },
  completionSubtext: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: width * 0.05,
  },
  progress: {
    fontSize: width * 0.035,
    color: '#58CCF7',
    textAlign: 'center',
    marginTop: height * 0.02,
    fontWeight: '500',
  },
});
