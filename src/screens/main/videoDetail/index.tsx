import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useRef, LegacyRef} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

import Video, {VideoProperties} from 'react-native-video';
import AppImages from '../../../assets/images';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';
const VideosDetailScreen = () => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const videoRef = useRef<Video>();
  const route = useRoute();
  const {uri} = route.params;
  const videoPlayPause = () => {
    // setIsVideoPaused(status => !status);
    // videoRef?.current?.presentFullscreenPlayer()
    setVideoFullScreen((d) => !d)
  };
  return (
    <View style={styles.container}>
      <Video
      fullscreen={videoFullScreen}
      needsOffscreenAlphaCompositing = {true}
      resizeMode={'contain'}
      fullscreenOrientation={'landscape'}
        ref={videoRef}
        paused={isVideoPaused}
        source={{uri: uri}}
        style={styles.backgroundVideo}
      />
      <Pressable onPress={videoPlayPause}>
        <Image
          style={styles.videoPlayPauseIconStyle}
          source={isVideoPaused ? AppImages.play : AppImages.pause}
        />
      </Pressable>
    </View>
  );
};

export default VideosDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoPlayPauseIconStyle: {
    height: styleConfig.countPixelRatio(33),
    width: styleConfig.countPixelRatio(33),
    tintColor: colors.white,
  },
});
