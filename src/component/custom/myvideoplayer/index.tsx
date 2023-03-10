import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import Video, {
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from "react-native-video";
import Slider from "@react-native-community/slider";
import PressableIcon from "../pressableIcon";
import AppImages from "../../../assets/images";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  formatTime,
  formatTimeToMins,
} from "../../npm/videoplayer/src/video-utils";
import GS from "../../../utils/styles";

const CONTROLS_HIDE_TIMEOUT = 5000; // 5 seconds
const controlAnimateConfig = {
  duration: 200,
};

export const VMVideoPlayer = ({
  source,
  disableControl,
  doubleTapInterval = 500,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showTimeRemaining, setShowTimeRemaining] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoPlayer = useRef<Video>(null);
  const isSeeking = useRef(false);
  const max = useSharedValue(100);
  const min = useSharedValue(0);
  const isScrubbing = useSharedValue(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    // StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("#000");
    return () => {
      //   StatusBar.setTranslucent(false);
      StatusBar.setBarStyle("default");
    };
  }, []);

  /**
   * reanimated value
   */
  const controlViewOpacity = useSharedValue(1);

  /**
   * Set a timeout when the controls are shown
   * that hides them after a length of time.
   */
  const setControlTimeout = () => {
    "worklet";
    controlViewOpacity.value = withDelay(2000, withTiming(0));
  };

  /**
   * Clear the hide controls timeout.
   */
  const clearControlTimeout = () => {
    "worklet";
    cancelAnimation(controlViewOpacity);
  };

  /**
   * Reset the timer completely
   */
  const resetControlTimeout = () => {
    "worklet";
    clearControlTimeout();
    setControlTimeout();
  };

  /**
   * Animation to show controls
   * fade in.
   */
  const showControlAnimation = () => {
    "worklet";
    controlViewOpacity.value = withTiming(1, controlAnimateConfig);
    setControlTimeout();
  };
  /**
   * Animation to show controls
   * fade out.
   */
  const hideControlAnimation = () => {
    "worklet";
    controlViewOpacity.value = withTiming(0, controlAnimateConfig);
  };

  const onPlayPausePress = () => {
    setPaused(!paused);
    // showControls();
  };

  /**
   * When load starts we display a loading icon
   * and show the controls.
   */
  const onLoadStart = () => {
    setIsLoading(true);
  };

  /**
   * Toggle between showing time remaining or
   * video duration in the timer control
   */
  const toggleTimerOnJS = () => {
    setShowTimeRemaining(!showTimeRemaining);
  };
  const toggleTimer = () => {
    "worklet";
    runOnJS(toggleTimerOnJS)();
  };

  /**
   * Calculate the time to show in the timer area
   * based on if they want to see time remaining
   * or duration. Formatted to look as 00:00.
   */
  const calculateTime = () => {
    return showTimeRemaining
      ? `${formatTimeToMins(currentTime)}`
      : `-${formatTime({
          time: duration - currentTime,
          duration: duration,
        })}`;
  };

  /**
   * Seek to a time in the video.
   *
   * @param {float} time time to seek to in ms
   */
  const seekTo = (time = 0) => {
    setCurrentTime(time);
    videoPlayer.current?.seek(time);
  };
  const onLoad = (data: OnLoadData) => {
    setDuration(data?.duration);
    max.value = data?.duration;
    setIsLoading(false);
    setControlTimeout();
  };
  //   const onEnd = () => {
  //     setIsLoadEnd(true);
  //     pause();
  //     onVideoPlayEnd?.();
  //   };
  /**
   * For onSeek we clear scrubbing if set.
   *
   * @param {object} data The video meta data
   */
  const onSeek = (data: OnSeekData) => {
    if (isScrubbing.value) {
      // Seeking may be false here if the user released the seek bar while the player was still processing
      // the last seek command. In this case, perform the steps that have been postponed.
      if (!isSeeking.current) {
        setControlTimeout();
        pause();
      }
      isSeeking.current = false;
      isScrubbing.value = false;

      setCurrentTime(data.currentTime);
    } else {
      isSeeking.current = false;
    }
    // if (onPostSeek) {
    //   onPostSeek(data);
    // }
  };

  /**
   * For onprogress we fire listeners that
   * update our seekbar and timer.
   *
   * @param {object} data The video meta data
   */
  const onProgress = (data: OnProgressData) => {
    const { currentTime: cTime } = data;
    if (!isScrubbing.value) {
      if (!isSeeking.current) {
        progress.value = cTime;
      }
      setCurrentTime(cTime);
    }
    // if (onPostProgress) {
    //   onPostProgress(data);
    // }
  };
  /**
   * on replay video
   */
  const onReplyVideo = () => {
    seekTo(0);
    setCurrentTime(0);
    progress.value = 0;
  };

  /**
   * play the video
   */
  const play = () => {
    // onPausedChange(false);
  };

  /**
   * pause the video
   */
  const pause = () => {
    // onPausedChange(true);
  };
  const controlViewStyles = useAnimatedStyle(() => {
    return {
      opacity: controlViewOpacity.value,
    };
  });

  /**
   * on pan event
   */
  const onPanGesture = Gesture.Pan()
    .onStart(({ velocityY, velocityX }) => {
      //   panIsVertical.value = Math.abs(velocityY) > Math.abs(velocityX);
    })
    .onUpdate(({ translationY }) => {
      //   controlViewOpacity.value = withTiming(0, { duration: 100 });
      //   if (isFullScreen.value) {
      //     if (translationY > 0 && Math.abs(translationY) < 100) {
      //       videoScale.value = clamp(0.9, 1 - Math.abs(translationY) * 0.008, 1);
      //       videoTransY.value = translationY;
      //     }
      //   } else {
      //     if (translationY < 0 && Math.abs(translationY) < 40) {
      //       videoScale.value = Math.abs(translationY) * 0.012 + 1;
      //     }
      //   }
    })
    .onEnd(({ translationY }, success) => {
      //   if (!panIsVertical.value && !success) {
      //     return;
      //   }
      //   if (isFullScreen.value) {
      //     if (translationY >= 100) {
      //       runOnJS(exitFullScreen)();
      //     }
      //   } else {
      //     if (-translationY >= 40) {
      //       runOnJS(enterFullScreen)();
      //     }
      //   }
      //   videoTransY.value = 0;
      //   videoScale.value = withTiming(1);
    });

  const singleTapHandler = Gesture.Tap().onEnd((_event, success) => {
    if (disableControl) {
      return;
    }
    if (success) {
      if (controlViewOpacity.value === 0) {
        controlViewOpacity.value = withTiming(1, controlAnimateConfig);
        setControlTimeout();
      } else {
        controlViewOpacity.value = withTiming(0, controlAnimateConfig);
      }
    }
  });

  const doubleTapHandle = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(doubleTapInterval)
    .onStart(({ x }) => {
      //   doubleTapIsAlive.value =
      //     x < leftDoubleTapBoundary && x > rightDoubleTapBoundary;
    })
    .onEnd(({ x, y, numberOfPointers }, success) => {
      //   if (success) {
      //     if (numberOfPointers !== 1) {
      //       return;
      //     }
      //     if (x < leftDoubleTapBoundary) {
      //       doubleLeftOpacity.value = 1;
      //       rippleLeft.current?.onPress({ x, y });
      //       runOnJS(seekByStep)(true);
      //       return;
      //     }
      //     if (x > rightDoubleTapBoundary) {
      //       doubleRightOpacity.value = 1;
      //       rippleRight.current?.onPress({
      //         x: x - rightDoubleTapBoundary,
      //         y,
      //       });
      //       runOnJS(seekByStep)(false);
      //       return;
      //     }
      //   }
    });

  const taps = Gesture.Exclusive(doubleTapHandle, singleTapHandler);
  const gesture = Gesture.Race(onPanGesture, taps);

  /**
   * Render the seekbar and attach its handlers
   */
  const onSlidingComplete = (val: number) => {
    console.log("===onMagicTap", val);

    isSeeking.current = true;
    seekTo(val);
  };
  const onSlidingStart = () => {
    clearControlTimeout();
  };

  const onTapSlider = () => {
    console.log("ca....");

    if (disableControl) {
      return;
    }
    if (controlViewOpacity.value === 0) {
      showControlAnimation();
    }
  };

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Video
          ref={videoPlayer}
          source={source}
          style={styles.video}
          paused={paused}
          onProgress={onProgress}
          onLoad={onLoad}
          volume={0}
          resizeMode="contain"
        />
        <Animated.View style={StyleSheet.absoluteFillObject}>
          <Animated.View style={[styles.controlView, controlViewStyles]}>
            <PressableIcon
              onIconClick={onPlayPausePress}
              containerStyle={styles.playPauseButton}
              iconSource={paused ? AppImages.play : AppImages.pause}
            />
            <View style={styles.bottomControlContainer}>
              <Text style={[GS.text_white_medium]}>
                {`${formatTimeToMins(duration)}`}
              </Text>
              <Slider
                onResponderGrant={() => true}
                style={styles.slider}
                minimumValue={min.value}
                maximumValue={max.value}
                value={progress.value}
                onSlidingComplete={onSlidingComplete}
                onSlidingStart={onSlidingStart}
                vertical={true}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#aaa"
                thumbTintColor="#fff"
              />
              <Text style={[GS.text_white_medium]} onPress={toggleTimer}>
                {calculateTime()}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  controlView: {
    backgroundColor: "rgba(0,0,0,.6)",
    justifyContent: "space-between",
    overflow: "hidden",
    ...StyleSheet.absoluteFillObject,
  },
  playPauseButton: {
    marginRight: 10,
  },
  slider: {
    marginBottom: 43,
    flex: 1,
  },
  bottomControlContainer: {
    flexDirection: "row",
  },
});
