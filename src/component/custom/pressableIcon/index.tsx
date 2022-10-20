import {
  StyleSheet,
  Pressable,
  Image,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import React, {FC} from 'react';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';

const PressableIcon: FC<{
  iconSource: ImageSourcePropType;
  onIconClick: () => void;
  containerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
}> = props => {
  const {iconSource, onIconClick, containerStyle, iconStyle} = props;

  return (
    <Pressable
      hitSlop={5}
      style={[styles.iconContainerStyle, containerStyle]}
      onPress={onIconClick}>
      <Image style={[styles.iconStyle, iconStyle]} source={iconSource} />
    </Pressable>
  );
};

export default PressableIcon;

const styles = StyleSheet.create({
  iconStyle: {
    height: styleConfig.countPixelRatio(25),
    width: styleConfig.countPixelRatio(25),
    tintColor: colors.white,
  },
  iconContainerStyle: {
    paddingVertical: styleConfig.smartScale(10),
    paddingHorizontal: styleConfig.smartWidthScale(10),
  },
});
