import { Text, View, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import { VideoDetailScreenType } from "../../navigators/types/navigation";
import { Colors, Fonts, Layout } from "../../theme";
import Orientation, {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from "react-native-orientation-locker";
import SystemNavigationBar from "react-native-system-navigation-bar";
import {
  Gesture,
  GestureDetector,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ytUrl = `https://rr4---sn-8vq54voxpo-5hqe.googlevideo.com/videoplayback?expire=1688860794&ei=GqSpZIusEO-wlu8PhJGSqAo&ip=191.96.67.232&id=o-AA95ZW4eIr6vev9w3OEyT05591JkRTFiuCS2SK1VyKww&itag=18&source=youtube&requiressl=yes&spc=Ul2Sq0dIKcS7dnfEuSVs16GlOnUpYtx5whuouo4bEg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Gvy1B3_F5ykrhk_EzamDiPYO&cnr=14&ratebypass=yes&dur=417.541&lmt=1666666315460443&fexp=24007246&c=WEB&txp=5438434&n=FqFi4QAqFos8Gg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgOxmEo8FFZ7HV8Wlx4-TOWyHLWVR1zi_tsxVVHUGhWMcCIQCwA8MAMFR0Fish6klNNZjwPxxjAumyHU32D9z445tdRw%3D%3D&redirect_counter=1&rm=sn-q4fe7z7z&req_id=11288e9a7e05a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Pt&mip=2402:3a80:1cfe:9a67:d455:436f:b692:b723&mm=31&mn=sn-8vq54voxpo-5hqe&ms=au&mt=1688838783&mv=m&mvi=4&pl=44&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgdlkSkT-iXi_jA8tHyLnWzSKSn1Je1cP9bjuMuu8VELgCIQDEvjZKEDLOTihkV0R7rfILMoQhps0NZeu-lFKnESeJJA%3D%3D`;

const minZoom = 0.25; // 25% zoom
const maxZoom = 2; // 200% zoom

const VideoDetail = ({ navigation, route }: VideoDetailScreenType) => {
  const { videos, index } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(index);

  const [zoomPercentage, setZoomPercentage] = useState(100);
  const scale = useSharedValue(1);
  const previousScale = useSharedValue(1);
  const zoomPercentageOpacity = useSharedValue(0);

  const videoRef = useRef<Video | null>(null);
  const { playableDuration, uri, filename, orientation, height, width } =
    videos[currentVideoIndex].node.image;

  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();

  const leftDoubleTapBoundary =
    dimensions.width / 2 - insets.left - insets.right - 80;

  const rightDoubleTapBoundary =
    dimensions.width - leftDoubleTapBoundary - insets.left - insets.right;

  useEffect(() => {
    SystemNavigationBar.stickyImmersive(true);
    SystemNavigationBar.navigationHide();
    return () => {
      SystemNavigationBar.stickyImmersive(false);
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
    };
  }, []);

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
      const percentage = Math.round(scale.value * 100);
      runOnJS(setZoomPercentage)(percentage);
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
    if (success) {
      console.log("singleTapHandler~~~>", singleTapHandler);
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

  return (
    <>
      <OrientationLocker orientation={height > width ? PORTRAIT : LANDSCAPE} />
      <GestureDetector gesture={gesture}>
        <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
          <Animated.View style={[Layout.fill, videoContainerAnimStyle]}>
            <Video
              ref={videoRef}
              repeat={true}
              source={{ uri: ytUrl }}
              resizeMode="contain"
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
            <Text style={[Fonts.textNormal, styles.zoomPercentageText]}>
              {zoomPercentage}%
            </Text>
          </Animated.View>
        </View>
      </GestureDetector>
    </>
  );
};

export default VideoDetail;
