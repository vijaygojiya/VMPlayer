import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const isIphone = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const APP_FONTS = {
  MONTSERRAT_LIGHT: 'Montserrat-Light',
  MONTSERRAT_MEDIUM: 'Montserrat-Medium',
  MONTSERRAT_BOLD: 'Montserrat-Bold',
  MONTSERRAT_ITALIC: 'Montserrat-Italic',
  MONTSERRAT_REGULAR: 'Montserrat-Regular',
  MONTSERRAT_SEMIBOLD: 'Montserrat-SemiBold',
};

export default {
  fontLight: APP_FONTS.MONTSERRAT_LIGHT,
  fontRegular: APP_FONTS.MONTSERRAT_REGULAR,
  fontMedium: APP_FONTS.MONTSERRAT_MEDIUM,
  fontBold: APP_FONTS.MONTSERRAT_BOLD,
  fontItalic: APP_FONTS.MONTSERRAT_ITALIC,
  fontSemibold: APP_FONTS.MONTSERRAT_SEMIBOLD,
  width,
  height,
  isIphone,
  isAndroid,
};
