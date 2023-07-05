import {StyleSheet} from 'react-native';

import StyleConfig from './StyleConfig';
import {FontSize} from './Variables';
import Colors from './Colors';

const Fonts = StyleSheet.create({
  textTiny: {
    fontSize: FontSize.tiny,
    color: Colors.black,
  },
  textTinyExtra: {
    fontSize: FontSize.tinyExtra,
    color: Colors.black,
  },
  textTinyPlus: {
    fontSize: FontSize.small,
    color: Colors.black,
  },
  textSmall: {
    fontSize: FontSize.small,
    color: Colors.black,
  },
  textRegular: {
    fontSize: FontSize.regular,
    color: Colors.primaryText,
  },
  textSmallPlus: {
    fontSize: FontSize.smallPlus,
    color: Colors.black,
  },
  textMedium: {
    fontSize: FontSize.medium,
    color: Colors.black,
  },
  textMediumIntermediate: {
    fontSize: FontSize.mediumIntermediate,
    color: Colors.black,
  },
  textMediumPlus: {
    fontSize: FontSize.mediumPlus,
    color: Colors.black,
  },
  textRegularBlack: {
    fontSize: FontSize.plus,
    color: Colors.black,
  },
  textRegularWhite: {
    fontSize: FontSize.regular,
    color: Colors.white,
  },
  textLarge: {
    fontSize: FontSize.large,
    color: Colors.black,
  },
  textLargePlus: {
    fontSize: FontSize.largePlus,
    color: Colors.black,
  },
  textHuge: {
    fontSize: FontSize.huge,
    color: Colors.black,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  titleSmall: {
    fontSize: FontSize.small * 1.5,
    fontWeight: 'bold',
    color: Colors.black,
  },
  titleRegularBlack: {
    fontSize: FontSize.regular * 2,
    fontWeight: 'bold',
    color: Colors.black,
  },
  titleRegularWhite: {
    fontSize: FontSize.regular * 2,
    fontWeight: 'bold',
    color: Colors.white,
  },
  titleLarge: {
    fontSize: FontSize.large * 2,
    fontWeight: 'bold',
    color: Colors.black,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
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
  textLight: {
    color: Colors.lightGrey,
  },
  textLobster: {
    fontFamily: 'lobster',
    fontWeight: 'normal',
  },
  textPopinsBold: {
    fontFamily: StyleConfig.fontBold,
  },
  textPopinsSemiBold: {
    fontFamily: StyleConfig.fontSemibold,
  },
  textPopinsRegular: {
    fontFamily: StyleConfig.fontRegular,
  },
  textInterBold: {
    fontFamily: StyleConfig.fontInterBold,
  },
  textInterSemiBold: {
    fontFamily: StyleConfig.fontInterSemibold,
  },
  textInterRegular: {
    fontFamily: StyleConfig.fontInterRegular,
  },
  textInterMedium: {
    fontFamily: StyleConfig.fontInterMedium,
  },
  // textLineHeightHugePlus: {
  //   lineHeight: StyleConfig.countPixelRatio(48),
  // },
  // textLineHeightHuge: {
  //   lineHeight: StyleConfig.countPixelRatio(40),
  // },
  // textLineDefaultHuge: {
  //   lineHeight: StyleConfig.countPixelRatio(30),
  // },
  // textLineHeightDefaultPlus: {
  //   lineHeight: StyleConfig.countPixelRatio(28),
  // },
  // textLineHeightDefaultIntermediate: {
  //   lineHeight: StyleConfig.countPixelRatio(27),
  // },
  // textLineHeightDefault: {
  //   lineHeight: StyleConfig.countPixelRatio(26),
  // },
  // textLineHeightDefaultSmall: {
  //   lineHeight: StyleConfig.countPixelRatio(22),
  // },
  // textLineHeightRegularPlus: {
  //   lineHeight: StyleConfig.countPixelRatio(20),
  // },
  // textLineHeightRegular: {
  //   lineHeight: StyleConfig.countPixelRatio(19),
  // },
  // textLineHeightSmallPlus: {
  //   lineHeight: StyleConfig.countPixelRatio(17),
  // },
  // textLineHeightSmall: {
  //   lineHeight: StyleConfig.countPixelRatio(15),
  // },
});

export default Fonts;
