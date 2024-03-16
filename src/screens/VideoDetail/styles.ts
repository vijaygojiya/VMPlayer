import { StyleSheet } from "react-native";
import { Colors, Layout, StyleConfig } from "../../theme";

const styles = StyleSheet.create({
  zoomPercentageText: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  controlContainer: {
    justifyContent: "center",
    overflow: "hidden",
  },
  slider: {
    zIndex: 91,
    marginBottom: 33,
  },
  bottomControls: {
    // bottom: 0,
    // position: "absolute",
    // width: "100%",
  },
  group: {
    // paddingHorizontal: 20,
  },
  controlBg: {
    // backgroundColor: Colors.black20,
    paddingBottom: 10,
  },
  bottomControlGroup: {
    paddingBottom: 40,
  },
  timerText: {
    marginHorizontal: 10,
  },
  topControlContainer: {
    marginTop: 20,
  },
  playerIcon: {
    height: 24,
    width: 24,
    paddingHorizontal: 28,
    marginHorizontal: 10,
  },
});
export default styles;
