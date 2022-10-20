import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import styleConfig from '../utils/styleConfig';
import GS from '../utils/styles';

const ItemTab: React.FC<{
  item: any;
  index: number;
  isSelected: boolean;
  onTabClickListener: (index: number) => void;
}> = ({item, index, isSelected, onTabClickListener}) => {
  return (
    <TouchableOpacity
      accessibilityLabel={`Tab-${index}`}
      activeOpacity={0.8}
      style={styles.toTabContainer}
      onPress={() => {
        onTabClickListener(index);
      }}>
      <Image
        style={[isSelected ? styles.iIcon : styles.iIconnActive]}
        source={isSelected ? item.ActiveIcon : item.InActiveIcon}
      />
      <Text
        style={[
          GS.text_black_medium,
          {marginVertical: styleConfig.smartScale(5)},
          isSelected
            ? {color: colors.darkGreyBlue}
            : {color: colors.darkGreyBlue},
        ]}>
        {item.Name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toTabContainer: {
    width: styleConfig.width / 3,
    paddingVertical: styleConfig.smartScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iIcon: {
    width: styleConfig.countPixelRatio(25),
    height: styleConfig.countPixelRatio(25),
    tintColor: colors.blue,
    resizeMode: 'contain',
  },
  iIconnActive: {
    width: styleConfig.countPixelRatio(25),
    height: styleConfig.countPixelRatio(25),
    tintColor: colors.lightGreyBlue,
    resizeMode: 'contain',
  },
});
export default ItemTab;
