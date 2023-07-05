import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import {Text, Pressable, Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../theme';
import Methods from '../../utils/Methods';

const VideoListItem: React.FC<PhotoIdentifier> = props => {
  const {filename, playableDuration, uri} = props.node.image;
  const {onVideoItemPress} = props;

  return (
    <Pressable
      android_ripple={{color: Colors.grey}}
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
          style={[styles.titleTextStyle]}>
          {filename}
        </Text>
        <Text numberOfLines={1} style={styles.countTextStyle}>
          {Methods.getDurationTime(playableDuration)}
        </Text>
      </View>
    </Pressable>
  );
};

export default VideoListItem;

const styles = StyleSheet.create({
  folderIconStyle: {
    height: 65,
    width: (16 / 8) * 50,
    marginEnd: 10,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderRadius: 18,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  titleTextStyle: {
    fontSize: 16,
    color: Colors.lightGreyBlue,
  },
  countTextStyle: {
    color: Colors.lightGreyBlue,
    fontSize: 13,
    opacity: 0.5,
  },
});
