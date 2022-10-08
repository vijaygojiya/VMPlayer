import {Platform, TextStyle, ViewStyle} from 'react-native';
import colors from './colors';
import {Sizes} from './dimensions';
import styleConfig from './styleConfig';

interface styeleProps {
  text_black_semibold: TextStyle;
  text_black_bold: TextStyle;
  text_black_shop_bold: TextStyle;
  text_black_medium: TextStyle;
  text_black_regular: TextStyle;
  text_white_semibold: TextStyle;
  text_white_bold: TextStyle;
  text_white_medium: TextStyle;
  text_white_regular: TextStyle;
  text_white_small_bold: TextStyle;
  text_secondary_semibold: TextStyle;
  text_secondary_bold: TextStyle;
  text_secondary_medium: TextStyle;
  text_secondary_regular: TextStyle;
  text_primary_semibold: TextStyle;
  text_primary_bold: TextStyle;
  text_primary_medium: TextStyle;
  text_primary_regular: TextStyle;
  text_light_white_semibold: TextStyle;
  text_light_white_bold: TextStyle;
  text_light_white_medium: TextStyle;
  text_light_white_regular: TextStyle;
  text_blue_semibold: TextStyle;
  text_blue_bold: TextStyle;
  text_blue_medium: TextStyle;
  text_blue_regular: TextStyle;
  text_light_grey_semibold: TextStyle;
  text_light_grey_bold: TextStyle;
  text_light_grey_medium: TextStyle;
  text_light_grey_regular: TextStyle;
  shadowEffect: ViewStyle;
  buttonContainer: ViewStyle;
  loginButtonContainer: ViewStyle;
  lineContainer: ViewStyle;
  tValidation: TextStyle;
}

const GS: styeleProps = {
  text_black_semibold: {
    color: colors.black,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_black_bold: {
    color: colors.black,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_black_shop_bold: {
    color: colors.black,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  text_black_medium: {
    color: colors.black,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_black_regular: {
    color: colors.black,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },
  text_white_semibold: {
    color: colors.white,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_white_bold: {
    color: colors.white,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_white_medium: {
    color: colors.white,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_white_regular: {
    color: colors.white,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },
  text_white_small_bold: {
    color: colors.white,
    fontSize: Sizes.text.small,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },

  text_secondary_semibold: {
    color: colors.secondary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_secondary_bold: {
    color: colors.secondary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_secondary_medium: {
    color: colors.secondary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_secondary_regular: {
    color: colors.secondary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },

  text_primary_semibold: {
    color: colors.primary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_primary_bold: {
    color: colors.primary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_primary_medium: {
    color: colors.primary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_primary_regular: {
    color: colors.primary,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },

  text_light_white_semibold: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_light_white_bold: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_light_white_medium: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_light_white_regular: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },

  text_blue_semibold: {
    color: colors.blue,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_blue_bold: {
    color: colors.blue,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_blue_medium: {
    color: colors.blue,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_blue_regular: {
    color: colors.blue,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },

  text_light_grey_semibold: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontSemiBold,
  },
  text_light_grey_bold: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontBold,
  },
  text_light_grey_medium: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontMedium,
  },
  text_light_grey_regular: {
    color: colors.lightGrey,
    fontSize: Sizes.text.detail,
    textAlign: 'left',
    fontFamily: styleConfig.fontRegular,
  },

  shadowEffect: {
    shadowColor: colors.black,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: Sizes.cornerRadius.large,
    elevation:
      Platform.OS === 'android' ? Sizes.androidElevation : Sizes.iosElevation,
  },

  loginButtonContainer: {
    alignItems: 'center',
    height: styleConfig.smartScale(40),
    marginTop: styleConfig.smartScale(14),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    marginStart: styleConfig.smartWidthScale(20),
    marginEnd: styleConfig.smartWidthScale(20),
    borderRadius: Sizes.cornerRadius.small,
  },
  buttonContainer: {
    alignItems: 'center',
    height: styleConfig.smartScale(40),
    marginTop: styleConfig.smartScale(30),
    backgroundColor: colors.blue,
    justifyContent: 'center',
    marginStart: styleConfig.smartWidthScale(20),
    marginEnd: styleConfig.smartWidthScale(20),
    borderRadius: Sizes.cornerRadius.small,
  },
  lineContainer: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderColor,
  },
  tValidation: {
    textAlign: 'left',
    marginLeft: 28,
    color: colors.tomato_red,
  },
};
export default GS;
