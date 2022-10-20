import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

import Video, {OnProgressData} from 'react-native-video';
import AppImages from '../../../assets/images';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';
import {showToast} from '../../../utils/tost';
import Method from '../../../utils/method';
import GS from '../../../utils/styles';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import PressableIcon from '../../../component/custom/pressableIcon';
// import {
//   Gesture,
//   GestureDetector,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';

const VideosDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {videos, index} = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(index);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoControlVisible, setIsVideoControlVisible] = useState(true);
  // const [volume, setVolume] = useState(1);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    showVideoContros();
  }, [currentVideoIndex]);

  const videoRef = useRef<Video>();
  const {playableDuration, uri, filename} =
    videos[currentVideoIndex].node.image;
  // const context = useSharedValue({y: 0});
  // const gesture = Gesture.Pan()
  //   .onStart(e => {
  //     context.value = {y: e.translationY};
  //     console.log('===eeee', e);
  //   })
  //   .onUpdate(event => {
  //     if (context.value.y <= event.translationY) {
  //       console.log('descrinng...');
  //       if (volume > 0) {
  //         setVolume(v => v - 0.05);
  //       }
  //     } else {
  //       if (volume < 1) {
  //         setVolume(v => v + 0.05);
  //       }
  //     }
  //   })
  //   .onEnd(() => {
  //     hideVideoControls();
  //   });

  const videoPlayPause = () => {
    showVideoContros();
    setIsVideoPaused(videoStatus => !videoStatus);
  };

  const nextVideo = () => {
    if (videos.length - 1 !== currentVideoIndex) {
      setIsVideoPaused(false);
      setCurrentTime(0);
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      showToast('No next video !');
    }
  };

  const previousVideo = () => {
    if (currentVideoIndex !== 0) {
      setIsVideoPaused(false);
      setCurrentTime(0);
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else {
      showToast('No previous video !');
    }
  };

  const onVideoProgress = (value: OnProgressData) => {
    setCurrentTime(value.currentTime);
  };
  const exitVideo = () => {
    navigation.goBack();
  };
  // const openBottomShhet = () => {};

  const showVideoContros = () => {
    setIsVideoControlVisible(true);
    // hideVideoControls();
  };
  const hideVideoControls = () => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
      setControlsTimeout(null);
    }

    const timeout = setTimeout(() => {
      setIsVideoControlVisible(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  // const dragging = () => {
  //   setIsVideoPaused(true);
  // };

  const seekVideo = value => {
    // setIsVideoPaused(false);
    videoRef.current?.seek(value);
  };

  const renderVideoControls = () => {
    if (isVideoControlVisible) {
      return (
        <Animated.View
          style={styles.controlContainer}
          entering={FadeIn}
          exiting={FadeOut}>
          <View style={styles.videoHeaderContainer}>
            <PressableIcon
              onIconClick={exitVideo}
              iconSource={AppImages.back}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.videoTitle}>
              {filename}
            </Text>
            <PressableIcon
              iconStyle={{transform: [{rotate: '90deg'}]}}
              onIconClick={exitVideo}
              iconSource={AppImages.ic_more}
            />
          </View>
          {/* <GestureDetector gesture={gesture}> */}
          <Pressable
            onPress={hideVideoControls}
            style={styles.spaceContainer}
          />
          {/* </GestureDetector> */}
          <View style={styles.videoControlContainer}>
            <PressableIcon
              onIconClick={previousVideo}
              iconSource={AppImages.previous}
            />
            <PressableIcon
              onIconClick={videoPlayPause}
              iconSource={isVideoPaused ? AppImages.play : AppImages.pause}
            />
            <PressableIcon
              onIconClick={nextVideo}
              iconSource={AppImages.next}
            />
          </View>
          <Text style={styles.videoTimingTextStyle}>
            {Method.getDurationTime(currentTime)} /{' '}
            {Method.getDurationTime(playableDuration)}
          </Text>
          <Slider
            style={[styles.progressSlider]}
            // onValueChange={dragging}
            onSlidingComplete={seekVideo}
            maximumValue={Math.floor(playableDuration)}
            value={Math.floor(currentTime)}
            trackStyle={[styles.track]}
            thumbStyle={[styles.thumb, {borderColor: colors.darkGreyBlue}]}
            minimumTrackTintColor={colors.darkGreyBlue}
          />
        </Animated.View>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <Video
        // volume={volume}
        onEnd={nextVideo}
        onProgress={onVideoProgress}
        needsOffscreenAlphaCompositing={true}
        resizeMode={'contain'}
        fullscreenOrientation={'landscape'}
        ref={videoRef}
        paused={isVideoPaused}
        source={{uri: uri}}
        style={styles.backgroundVideo}
      />
      <Pressable
        onPress={showVideoContros}
        disabled={isVideoControlVisible}
        style={styles.videoOverlayContainer}>
        {renderVideoControls()}
      </Pressable>
    </View>
  );
};

export default VideosDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  spaceContainer: {flex: 1},
  controlContainer: {flex: 1},
  videoOverlayContainer: {
    flex: 1,
    marginVertical: styleConfig.smartScale(15),
  },
  videoTitle: {
    ...GS.text_light_white_regular,
    color: colors.white,
    flex: 1,
  },
  videoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressSlider: {
    alignSelf: 'stretch',
  },
  thumb: {
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20,
  },
  track: {
    borderRadius: 1,
    height: 5,
  },
  videoControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: styleConfig.smartWidthScale(25),
  },
  videoTimingTextStyle: {
    color: colors.lightGreyBlue,
    marginHorizontal: styleConfig.smartWidthScale(16),
  },
});
