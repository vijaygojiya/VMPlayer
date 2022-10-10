import {Album} from '@react-native-camera-roll/camera-roll';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable, Image, StyleSheet} from 'react-native';
import AppImages from '../../../assets/images';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';

const VideoFolderListItem: React.FC<{
  title: string;
  count: number;
  onItemPress: (name: string) => void;
}> = props => {
  const {title, count, onItemPress} = props;

  return (
    <Pressable
      onPress={() => {
        onItemPress(title);
      }}
      style={styles.rowContainer}>
      <Image source={AppImages.folder} style={styles.folderIconStyle} />
      <Text style={styles.titleTextStyle}>
        {title} <Text style={styles.countTextStyle}>({count})</Text>
      </Text>
    </Pressable>
  );
};

export default VideoFolderListItem;

const styles = StyleSheet.create({
  folderIconStyle: {
    height: styleConfig.countPixelRatio(30),
    width: styleConfig.countPixelRatio(30),
    marginEnd: styleConfig.smartWidthScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: styleConfig.smartScale(10),
    marginHorizontal: styleConfig.smartWidthScale(10),
    alignItems: 'center',
  },
  countTextStyle: {
    color: colors.lightText,
  },
  titleTextStyle: {
    flex: 1,
    color: colors.mainText,
    marginEnd: styleConfig.smartWidthScale(10),
  },
});
