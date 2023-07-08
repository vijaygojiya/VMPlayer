import { Text, View, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import { VideoDetailScreenType } from "../../navigators/types/navigation";
import { Layout, StyleConfig } from "../../theme";
import Orientation, {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from "react-native-orientation-locker";
import SystemNavigationBar from "react-native-system-navigation-bar";

const VideoDetail = ({ navigation, route }: VideoDetailScreenType) => {
  const [paused, setPaused] = useState(false);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { videos, index } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(index);

  const videoRef = useRef<Video | null>(null);
  const { playableDuration, uri, filename, orientation, height, width } =
    videos[currentVideoIndex].node.image;
  useEffect(() => {
    SystemNavigationBar.stickyImmersive(true);
    SystemNavigationBar.navigationHide();
    return () => {
      SystemNavigationBar.stickyImmersive(false);
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "green" }}>
      <OrientationLocker
        orientation={height > width ? PORTRAIT : LANDSCAPE}
        onChange={(orientation) => console.log("onChange", orientation)}
      />
      <Video
        ref={videoRef}
        repeat={true}
        source={{ uri }}
        resizeMode="contain"
        style={[Layout.fill]}
      />
    </View>
  );
};

export default VideoDetail;
