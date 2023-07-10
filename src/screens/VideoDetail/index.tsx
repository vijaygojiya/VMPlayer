import { Image, Text, View, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video, {
  LoadError,
  OnBufferData,
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from "react-native-video";
import { VideoDetailScreenType } from "../../navigators/types/navigation";
import { Colors, Fonts, Images, Layout } from "../../theme";
import Orientation, {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from "react-native-orientation-locker";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReText from "../../components/RnText";
import { TapController, VideoError, VideoLoader } from "../../components";
import Methods from "../../utils/Methods";
import { formatTime, formatTimeToMins, secondToTime } from "../../utils";
import { Slider } from "react-native-awesome-slider";

const ytUrl = `https://rr3---sn-8vq54voxpo-pn3l.googlevideo.com/videoplayback?expire=1688940020&ei=lNmqZOzfIZinv_IPt-y98Ao&ip=46.246.122.182&id=o-AEbnFTZ3_gLje9X3DPAqfgIzQPyFghlHb8qWi27N1MB9&itag=18&source=youtube&requiressl=yes&spc=Ul2Sq11Pwj9IyhyK82OLtB1k65EErQVXxWg0r1UiMQ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=uR0vQyjtej4h6cX1wMB9--MO&cnr=14&ratebypass=yes&dur=342.029&lmt=1657844336054895&fexp=24007246,24350017,24363392&beids=24350017&c=WEB&txp=6318224&n=ziuUvphYtRnA-Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAPBwB4jzxkAh_BVmBTR291MahD2HPJJDpSwGuRQIfa4VAiEAkso6jzRhtwAfI3XUyjM-phmklBoQ_pZyk5e8lkmUmQI%3D&redirect_counter=1&rm=sn-5goly7e&req_id=583d7f8acaf6a3ee&cms_redirect=yes&ipbypass=yes&mh=lH&mip=2402:8100:26b6:d11d:6921:7c97:9b08:60ba&mm=31&mn=sn-8vq54voxpo-pn3l&ms=au&mt=1688917995&mv=m&mvi=3&pcm2cms=yes&pl=48&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRAIgWtpE5Mj45h9xGSt0Fh6lPt-GkmQ9CWUnChKFae7h2QgCIBlDey2UP8q6WkizAp9vleHjZgeSre79Cu2IBMW3v5Pf`;

const minZoom = 0.25; // 25% zoom
const maxZoom = 2; // 200% zoom
const controlTimeout = 2000;
const controlAnimteConfig = {
  duration: 200,
};
const showOnStart = true;
const disableControl = false;
export const bin = (value: boolean): 0 | 1 => {
  "worklet";
  return value ? 1 : 0;
};

const theme = {
  minimumTrackTintColor: Colors.white,
  maximumTrackTintColor: Colors.lightGreyBlue,
  cacheTrackTintColor: Colors.grey,
  bubbleBackgroundColor: Colors.darkGreyBlue,
  disableMinTrackTintColor: Colors.error,
};
const VideoDetail = ({ navigation, route }: VideoDetailScreenType) => {
  const { videos, index } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(index);
  const [paused, setPause] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [showTimeRemaining, setShowTimeRemaining] = useState(true);

  /**
   * reanimated value
   */

  const max = useSharedValue(100);
  const min = useSharedValue(0);
  const isScrubbing = useSharedValue(false);
  const isSeeking = useRef(false);
  const progress = useSharedValue(0);
  const controlViewOpacity = useSharedValue(showOnStart ? 1 : 0);

  const scale = useSharedValue(1);
  const previousScale = useSharedValue(1);
  const zoomPercentageOpacity = useSharedValue(0);

  const videoRef = useRef<Video | null>(null);
  const { uri, filename, orientation, height, width } =
    videos[currentVideoIndex].node.image;

  const insets = useSafeAreaInsets();
  const insetsRef = useRef(insets);

  const dimensions = useWindowDimensions();

  const leftDoubleTapBoundary =
    dimensions.width / 2 - insets.left - insets.right - 80;

  const rightDoubleTapBoundary =
    dimensions.width - leftDoubleTapBoundary - insets.left - insets.right;

  useEffect(() => {
    SystemNavigationBar.stickyImmersive(true);
    SystemNavigationBar.navigationHide();
    return () => {
      clearControlTimeout();
      SystemNavigationBar.stickyImmersive(false);
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
    };
  }, []);

  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoad = (data: OnLoadData) => {
    setDuration(data?.duration);
    max.value = data?.duration;
    setIsLoading(false);
    setControlTimeout();
  };

  const onBuffer = (bufferData: OnBufferData) => {
    setIsLoading(bufferData.isBuffering);
  };

  const onError = (error: LoadError) => {
    console.log("onError~~~~~~~>", error.error.errorString);
    setIsError(true);
  };
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
  };
  const seekTo = (time = 0) => {
    setCurrentTime(time);
    videoRef.current?.seek(time);
  };
  /**
   * play the video
   */
  const play = () => {
    setPause(false);
  };

  /**
   * pause the video
   */
  const pause = () => {
    setPause(true);
  };

  const onProgress = (data: OnProgressData) => {
    const { currentTime: cTime } = data;
    if (!isScrubbing.value) {
      if (!isSeeking.current) {
        progress.value = cTime;
      }
      setCurrentTime(cTime);
    }
  };
  const setControlTimeout = () => {
    "worklet";
    // controlViewOpacity.value = withDelay(controlTimeout, withTiming(0));
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

    controlViewOpacity.value = 1;
    setControlTimeout();
  };
  /**
   * Animation to show controls
   * fade out.
   */
  const hideControlAnimation = () => {
    "worklet";
    controlViewOpacity.value = withTiming(0, controlAnimteConfig);
  };

  const checkTapTakesEffect = () => {
    "worklet";
    if (disableControl) {
      return false;
    }
    resetControlTimeout();
    if (controlViewOpacity.value === 0) {
      showControlAnimation();
      return false;
    }
    return true;
  };

  /**
   * gesture handlers
   */

  const onPinchGesture = Gesture.Pinch()
    .onStart(() => {
      previousScale.value = scale.value;
    })
    .onUpdate((event) => {
      zoomPercentageOpacity.value = withTiming(1, { duration: 100 });
      const newScale = previousScale.value * event.scale;
      scale.value = Math.max(Math.min(newScale, maxZoom), minZoom);
    })
    .onEnd(() => {
      zoomPercentageOpacity.value = withTiming(0, { duration: 1000 });
    });

  const onPanGesture = Gesture.Pan()
    .onStart(({ velocityY, velocityX }) => {
      // panIsVertical.value = Math.abs(velocityY) > Math.abs(velocityX);
    })
    .onUpdate(({ translationY }) => {
      console.log("-onUpdate---->", translationY);
    })
    .onEnd(({ translationY }, success) => {
      if (success) {
        console.log("-onEnd--->", translationY);
      }
    });
  const singleTapHandler = Gesture.Tap().onEnd((_event, success) => {
    if (disableControl) {
      return;
    }
    if (success) {
      if (controlViewOpacity.value === 0) {
        console.log("sd");

        showControlAnimation();
      } else {
        hideControlAnimation();
      }
    }
  });

  const doubleTapHandle = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(500)
    .onStart(({ x }) => {
      console.log("~~~~~~> doubleTapHandle start ", x);
    })
    .onEnd(({ x, y, numberOfPointers }, success) => {
      if (success) {
        if (numberOfPointers !== 1) {
          return;
        }
        if (x < leftDoubleTapBoundary) {
          console.log("~~~~~~> doubleTapHandle leftDoubleTapBoundary ", x);
          return;
        }
        if (x > rightDoubleTapBoundary) {
          console.log("~~~~~~> doubleTapHandle rightDoubleTapBoundary ", x);
          return;
        }
      }
    });

  const taps = Gesture.Exclusive(doubleTapHandle, singleTapHandler);
  const tapsAndPanGesture = Gesture.Race(onPanGesture, taps);
  const gesture = Gesture.Exclusive(onPinchGesture, tapsAndPanGesture);

  /**
   * Animated styles
   */
  const videoContainerAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  const zoomPercentageViewStyle = useAnimatedStyle(() => ({
    opacity: zoomPercentageOpacity.value,
  }));

  const controlViewStyles = useAnimatedStyle(() => {
    return {
      opacity: controlViewOpacity.value,
    };
  });

  const bottomControlStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: true ? -42 : 0,
        },
      ],
    };
  });
  /**
   * Render the seekbar and attach its handlers
   */
  const onSlidingComplete = (val: number) => {
    isSeeking.current = true;
    seekTo(val);
  };
  const onSlidingStart = () => {
    clearControlTimeout();
  };
  const zoomPercentage = useDerivedValue(() => {
    const percentage = Math.round(scale.value * 100);
    return `${percentage}%`;
  });

  /**
   * Toggle between showing time remaining or
   * video duration in the timer control
   */
  const toggleTimerOnJS = () => {
    setShowTimeRemaining(!showTimeRemaining);
  };
  const toggleTimer = () => {
    "worklet";
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }
    runOnJS(toggleTimerOnJS)();
  };
  const onTapSlider = () => {
    if (disableControl) {
      return;
    }
    if (controlViewOpacity.value === 0) {
      showControlAnimation();
    }
  };

  const calculateTime = () => {
    return showTimeRemaining
      ? `${formatTimeToMins(currentTime)}`
      : `-${formatTime({
          time: duration - currentTime,
          duration: duration,
        })}`;
  };

  const togglePlayOnJS = () => {
    setPause((prev) => !prev);
  };
  const onPauseTapHandler = () => {
    "worklet";
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }
    runOnJS(togglePlayOnJS)();
  };
  const handlerNextPrev = (isNext: boolean) => {
    if (isNext) {
      if (currentTime === videos.length - 1) {
        return;
      }
      setCurrentVideoIndex((currentIndex) => currentIndex + 1);
    } else {
      if (isNext) {
        if (currentTime === 0) {
          return;
        }
        setCurrentVideoIndex((currentIndex) => currentIndex - 1);
      }
    }
  };

  const onNextTapHandler = () => {
    "worklet";
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }
    runOnJS(handlerNextPrev)(true);
  };

  const onPreviousTapHandler = () => {
    "worklet";
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }
    runOnJS(handlerNextPrev)(false);
  };
  const onBackIconPress = () => {
    "worklet";
    const status = checkTapTakesEffect();
    if (!status) {
      return;
    }

    runOnJS(navigation.goBack)();
  };
  return (
    <>
      <OrientationLocker orientation={height > width ? PORTRAIT : LANDSCAPE} />
      <GestureDetector gesture={gesture}>
        <View style={[Layout.fill, { backgroundColor: Colors.darkGreyBlue }]}>
          <VideoError isError={isError} />
          <VideoLoader loading={loading} />
          <Animated.View style={[Layout.fill, videoContainerAnimStyle]}>
            <Video
              ref={videoRef}
              repeat={true}
              source={{ uri }}
              resizeMode="cover"
              paused={paused}
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              onBuffer={onBuffer}
              onError={onError}
              onSeek={onSeek}
              onProgress={onProgress}
              fullscreenAutorotate={true}
              style={Layout.fill}
            />
          </Animated.View>
          <Animated.View
            style={[
              Layout.absoluteFillObject,
              Layout.center,
              zoomPercentageViewStyle,
            ]}
          >
            <ReText
              text={zoomPercentage}
              style={[Fonts.textNormal, styles.zoomPercentageText]}
            />
          </Animated.View>
          <Animated.View
            style={[
              Layout.absoluteFillObject,
              styles.controlContainer,
              controlViewStyles,
            ]}
          >
            <View style={[Layout.rowHCenter, styles.topControlContainer]}>
              <TapController onPress={onBackIconPress}>
                <Image
                  source={Images.chevron}
                  resizeMode="contain"
                  style={[Layout.rotate90Inverse, styles.playerIcon]}
                />
              </TapController>
              <Text
                numberOfLines={2}
                style={[
                  Layout.fill,
                  Fonts.textRegular,
                  Fonts.textBold,
                  { color: Colors.white90 },
                ]}
              >
                {filename}
              </Text>
            </View>
            <View style={Layout.fill} />
            <View style={[Layout.rowHCenter, styles.controlBg]}>
              <TapController onPress={toggleTimer}>
                <Text style={[Fonts.textNormal, styles.timerText]}>
                  {calculateTime()}
                </Text>
              </TapController>
              {duration > 0 && (
                <Slider
                  theme={theme}
                  progress={progress}
                  onSlidingComplete={onSlidingComplete}
                  onSlidingStart={onSlidingStart}
                  minimumValue={min}
                  maximumValue={max}
                  isScrubbing={isScrubbing}
                  bubble={secondToTime}
                  disableTapEvent
                  onTap={onTapSlider}
                  thumbScaleValue={controlViewOpacity}
                  thumbWidth={8}
                  sliderHeight={2}
                />
              )}
              <Text style={[Fonts.textNormal, styles.timerText]}>
                {formatTimeToMins(duration)}
              </Text>
            </View>
            <View
              style={[
                styles.bottomControlGroup,
                Layout.rowCenter,
                styles.controlBg,
              ]}
            >
              <TapController onPress={onPreviousTapHandler}>
                <Image
                  source={Images.next}
                  resizeMode="contain"
                  style={[Layout.mirror, styles.playerIcon]}
                />
              </TapController>
              <TapController onPress={onPauseTapHandler}>
                <Image
                  style={styles.playerIcon}
                  resizeMode="contain"
                  source={paused ? Images.play : Images.pause}
                />
              </TapController>
              <TapController onPress={onNextTapHandler}>
                <Image
                  style={styles.playerIcon}
                  resizeMode="contain"
                  source={Images.next}
                />
              </TapController>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
    </>
  );
};

export default VideoDetail;
