import styleConfig from './styleConfig';

export const Margin = {
  huge: styleConfig.smartScale(128),
  extralarge: styleConfig.smartScale(64),
  large: styleConfig.smartScale(32),
  defaultLarge: styleConfig.smartScale(25),
  default: styleConfig.smartScale(20),
  defaultSmall: styleConfig.smartScale(14),
  small: styleConfig.smartScale(8),
  extraSmall: styleConfig.smartScale(4),
  tiny: styleConfig.smartScale(2),
};

export const Padding = {
  huge: styleConfig.smartScale(128),
  extralarge: styleConfig.smartScale(64),
  large: styleConfig.smartScale(32),
  default: styleConfig.smartScale(16),
  defaultSmall: styleConfig.smartScale(12),
  small: styleConfig.smartScale(8),
  extraSmall: styleConfig.smartScale(4),
  none: styleConfig.smartScale(0),
};

export const Sizes = {
  appBarBackSize: styleConfig.countPixelRatio(24),
  text: {
    appBarTitle: styleConfig.countPixelRatio(30),
    header: styleConfig.countPixelRatio(28),
    title: styleConfig.countPixelRatio(25),
    default: styleConfig.countPixelRatio(22),
    subtitle: styleConfig.countPixelRatio(18),
    detail: styleConfig.countPixelRatio(15),
    data: styleConfig.countPixelRatio(12),
    small: styleConfig.countPixelRatio(6),
  },
  cornerRadius: {
    extralarge: styleConfig.smartScale(24),
    large: styleConfig.smartScale(16),
    default: styleConfig.smartScale(8),
    small: styleConfig.smartScale(5),
    extraSmall: styleConfig.smartScale(2),
    circle: styleConfig.smartScale(100),
    ultraLarge: styleConfig.smartScale(70),
  },

  deviceHeight: styleConfig.height,
  deviceWidth: styleConfig.width,
  androidElevation: 10,
  iosElevation: 5,
  toolBarHeight: styleConfig.smartScale(55),
  zIndex: 9999,
};

export const BorderWidth = {
  extralarge: styleConfig.smartScale(5),
  large: styleConfig.smartScale(4),
  default: styleConfig.smartScale(3),
  small: styleConfig.smartScale(2),
  extraSmall: styleConfig.smartScale(1),
};

export const Icon = {
  height: styleConfig.smartScale(50),
  width: styleConfig.smartWidthScale(45),
  largeHeight: styleConfig.smartScale(35),
  largeWidth: styleConfig.smartWidthScale(38),
  defaultHeight: styleConfig.smartScale(15),
  defaultWidth: styleConfig.smartWidthScale(15),
  smallHeight: styleConfig.smartScale(10),
  smallWidth: styleConfig.smartWidthScale(10),
  commonHeight: styleConfig.smartScale(50),
  commonWidth: styleConfig.smartWidthScale(50),
  normalHeight: styleConfig.smartScale(20),
  normalWidth: styleConfig.smartWidthScale(20),
};

export const MaxLength = {
  name: 40,
  phoneNumber: 10,
  password: 20,
  age: 3,
  otp: 6,
  userName: 15,
  sellPrice: 7,
};
