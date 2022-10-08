import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import styleConfig from "../../../utils/styleConfig";



const styles = StyleSheet.create({
  saContainer: {
    // backgroundColor: '',
    paddingVertical: styleConfig.smartScale(10),
    marginBottom: styleConfig.smartScale(10),
  },
  vToolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:'green',
  },
  pIconContainer: {
    marginHorizontal: styleConfig.smartWidthScale(8),
    justifyContent: "center",
  },
  iBack: {
    width: styleConfig.countPixelRatio(25),
    height: styleConfig.countPixelRatio(25),
    resizeMode: "contain",
  },
  tTitle: {
    flex: 1,
    fontSize: styleConfig.countPixelRatio(22),
    textAlign:'left',
  },
});

export default styles;
