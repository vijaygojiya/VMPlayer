import {Album, PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable, Image, StyleSheet} from 'react-native';
import AppImages from '../../../assets/images';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';

const VideoDetailListItem: React.FC<PhotoIdentifier> = props => {
  const {filename, playableDuration, uri} = props.node.image;
  const {onVideoItemPress} = props;


  return (
    <Pressable
      onPress={onVideoItemPress}
      style={styles.rowContainer}>
      <Image source={{uri: uri}} style={styles.folderIconStyle} />
      <Text style={styles.titleTextStyle}>
        {filename}
        <Text style={styles.countTextStyle}>
          ( {moment.utc(playableDuration * 1000).format('m:ss')})
        </Text>
      </Text>
    </Pressable>
  );
};

export default VideoDetailListItem;

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
