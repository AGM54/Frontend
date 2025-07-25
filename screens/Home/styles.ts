// src/screens/Home/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#061C64",
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  greeting: {
    fontSize: width * 0.05,
    color: "#fff",
  },
  username: {
    fontWeight: "bold",
    color: "#fff",
  },
  wave: {
    fontSize: width * 0.05,
  },
  logo: {
    width: width * 0.25,
    height: height * 0.05,
    resizeMode: "contain",
  },
  scrollContent: {
    paddingBottom: height * 0.2,
  },
  cardPrimary: {
    backgroundColor: "#FF7A00",
    borderRadius: 15,
    padding: 15,
    marginBottom: height * 0.02,
  },
  cardSecondary: {
    backgroundColor: "#1B2BAF",
    borderRadius: 15,
    padding: 15,
    marginBottom: height * 0.02,
  },
  cardLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.04,
    marginBottom: 4,
  },
  cardTitle: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: width * 0.035,
    marginBottom: 8,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
  },
  cardInfo: {
    color: "#fff",
    fontSize: width * 0.035,
    marginLeft: 6,
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImageRight: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginLeft: 10,
  },
  cardImageLeft: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 10,
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  tabGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: height * 0.02,
  },
  tab: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
  tabActive: {
    backgroundColor: "#FF7A00",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabActiveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingBottom: height * 0.03,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  menuButton: {
    alignItems: "center",
  },
  menuText: {
    color: "#061C64",
    fontSize: width * 0.03,
    marginTop: 4,
  },
  menuButtonActive: {
    alignItems: "center",
  },
  menuTextActive: {
    color: "#FF7A00",
    fontSize: width * 0.03,
    fontWeight: "bold",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#ff4757",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
