import React from 'react';
import {View} from 'react-native';
import {Text, Pressable, Image, StyleSheet} from 'react-native';
import AppImages from '../../../assets/images';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';
import GS from '../../../utils/styles';

const FolderListItem: React.FC<{
  title: string;
  count: number;
  onItemPress: (name: string) => void;
}> = props => {
  const {title, count, onItemPress} = props;

  return (
    <Pressable
      android_ripple={{color: colors.grey}}
      onPress={() => {
        onItemPress(title, count);
      }}
      style={styles.rowContainer}>
      <Image source={AppImages.folder_filled} style={styles.folderIconStyle} />
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={[GS.text_black_medium, styles.titleTextStyle]}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.countTextStyle}>
          {count} {count > 1 ? 'videos' : 'video'}
        </Text>
      </View>
    </Pressable>
  );
};

export default FolderListItem;

const styles = StyleSheet.create({
  folderIconStyle: {
    height: styleConfig.countPixelRatio(55),
    width: styleConfig.countPixelRatio(55),
    marginEnd: styleConfig.smartWidthScale(10),
    tintColor: colors.blue,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: styleConfig.smartScale(5),
    paddingHorizontal: styleConfig.smartWidthScale(10),
    marginVertical: styleConfig.smartScale(3),
    borderRadius: styleConfig.countPixelRatio(18),
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  titleTextStyle: {
    fontSize: styleConfig.countPixelRatio(16),
    color: colors.lightGreyBlue,
  },
  countTextStyle: {
    color: colors.lightGreyBlue,
    fontSize: styleConfig.countPixelRatio(13),
    opacity: 0.5,
  },
});
