import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import styleConfig from '../utils/styleConfig';

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
        style={[ isSelected ?styles.iIcon : styles.iIconnActive]}
        source={isSelected ? item.ActiveIcon : item.InActiveIcon}
      />
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
    width: styleConfig.countPixelRatio(30),
    height: styleConfig.countPixelRatio(30),
    tintColor: colors.MenuActive,
    resizeMode: 'contain',
  },
  iIconnActive:{
    width: styleConfig.countPixelRatio(30),
    height: styleConfig.countPixelRatio(30),
    tintColor: colors.MenuInactive,
    resizeMode: 'contain',
  }
});
export default ItemTab;
