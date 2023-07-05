import Colors from './Colors';

export const FontSize = {
  tiny: 10,
  small: 12,
  normal: 14,
  regular: 16,
  large: 18,
  huge: 20,
  giant: 22,
  h6: 24,
  h5: 26,
  h4: 28,
  h3: 30,
  h2: 32,
  h1: 34,
};

const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export default {
  Colors,
  FontSize,
  MetricsSizes,
};
