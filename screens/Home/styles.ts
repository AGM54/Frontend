import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061C64',
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  greeting: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
  },
  wave: {
    fontSize: width * 0.045,
  },
  logo: {
    width: width * 0.2,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingBottom: height * 0.2,
  },
  cardPrimary: {
    backgroundColor: '#0072FF',
    borderRadius: 20,
    padding: width * 0.05,
    marginBottom: height * 0.02,
  },
  cardLabel: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cardInfo: {
    color: '#fff',
    fontSize: width * 0.035,
    marginLeft: 8,
  },
  tabGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.02,
  },
  tab: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    marginHorizontal: 5,
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabActive: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    marginHorizontal: 5,
  },
  tabActiveText: {
    color: '#061C64',
    fontWeight: 'bold',
  },
});

export default styles;
