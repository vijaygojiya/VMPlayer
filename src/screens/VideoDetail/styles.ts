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
    backgroundColor: Colors.black50,
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
  bottomControlGroup: {
    marginBottom: 10,
  },
  timerText: {
    marginHorizontal: 10,
  },
});
export default styles;
