import { StyleSheet } from "react-native";

import StyleConfig from "./StyleConfig";
import { FontSize } from "./Variables";
import Colors from "./Colors";

const Fonts = StyleSheet.create({
  textTiny: {
    fontSize: FontSize.tiny,
    color: Colors.white,
    fontFamily: StyleConfig.fontRegular,
  },

  textSmall: {
    fontSize: FontSize.small,
    color: Colors.white,
    fontFamily: StyleConfig.fontRegular,
  },
  textNormal: {
    fontSize: FontSize.normal,
    color: Colors.white,
    fontFamily: StyleConfig.fontRegular,
  },
  textRegular: {
    fontSize: FontSize.regular,
    color: Colors.white,
    fontFamily: StyleConfig.fontRegular,
  },

  textLarge: {
    fontSize: FontSize.large,
    color: Colors.black,
    fontFamily: StyleConfig.fontRegular,
  },

  textHuge: {
    fontSize: FontSize.huge,
    color: Colors.black,
    fontFamily: StyleConfig.fontRegular,
  },

  textGiant: {
    fontSize: FontSize.giant,
    color: Colors.black,
    fontFamily: StyleConfig.fontRegular,
  },
  textBold: {
    fontFamily: StyleConfig.fontBold,
  },
  textLight: {
    fontFamily: StyleConfig.fontLight,
  },
  textMedium: {
    fontFamily: StyleConfig.fontMedium,
  },
  textSemibold: {
    fontFamily: StyleConfig.fontSemibold,
  },
  textItalic: {
    fontFamily: StyleConfig.fontItalic,
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  // titleSmall: {
  //   fontSize: FontSize.small * 1.5,
  //   fontWeight: "bold",
  //   color: Colors.black,
  // },
  // titleRegularBlack: {
  //   fontSize: FontSize.regular * 2,
  //   fontWeight: "bold",
  //   color: Colors.black,
  // },
  // titleRegularWhite: {
  //   fontSize: FontSize.regular * 2,
  //   fontWeight: "bold",
  //   color: Colors.white,
  // },
  // titleLarge: {
  //   fontSize: FontSize.large * 2,
  //   fontWeight: "bold",
  //   color: Colors.black,
  // },
  textCenter: {
    textAlign: "center",
  },
  textJustify: {
    textAlign: "justify",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textError: {
    color: Colors.red,
  },
  textSuccess: {
    color: Colors.secondary,
  },
  textPrimary: {
    color: Colors.secondary,
  },
  // textLight: {
  //   color: Colors.lightGrey,
  // },
});

export default Fonts;
