import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import {Text, Pressable, Image, StyleSheet, View} from 'react-native';
import colors from '../../../utils/colors';
import Method from '../../../utils/method';
import styleConfig from '../../../utils/styleConfig';
import GS from '../../../utils/styles';

const VideoDetailListItem: React.FC<PhotoIdentifier> = props => {
  const {filename, playableDuration, uri} = props.node.image;
  const {onVideoItemPress} = props;

  return (
    <Pressable
      android_ripple={{color: colors.grey}}
      onPress={onVideoItemPress}
      style={styles.rowContainer}>
      <Image
        resizeMode="cover"
        source={{uri: uri}}
        style={styles.folderIconStyle}
      />
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={[GS.text_black_medium, styles.titleTextStyle]}>
          {filename}
        </Text>
        <Text numberOfLines={1} style={styles.countTextStyle}>
          {Method.getDurationTime(playableDuration)}
        </Text>
      </View>
    </Pressable>
  );
};

export default VideoDetailListItem;

const styles = StyleSheet.create({
  folderIconStyle: {
    height: styleConfig.countPixelRatio(65),
    width: (16 / 8) * styleConfig.countPixelRatio(50),
    marginEnd: styleConfig.smartWidthScale(10),
    borderRadius: styleConfig.countPixelRatio(10),
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
