import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";

import Video from "react-native-video";
import styleConfig from "../../../utils/styleConfig";

import { useSharedValue } from "react-native-reanimated";
import VideoPlayer from "../../../component/npm/videoplayer/src";
import { VMVideoPlayer } from "../../../component/custom/myvideoplayer";

const VIDEO_DEFAULT_HEIGHT = styleConfig.width * (9 / 16);
const VideosDetailScreen = () => {
  // const videoHeight = useSharedValue(VIDEO_DEFAULT_HEIGHT);
  const isFullScreen = useSharedValue(false);
  const [paused, setPaused] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { videos, index } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(index);

  const videoRef = useRef<Video>();
  const { playableDuration, uri, filename } =
    videos[currentVideoIndex].node.image;

  return (
    <View style={{ flex: 1 }}>
      {/* <VMVideoPlayer    source={{ uri: uri }} disableControl={false} /> */}
      <VideoPlayer
        source={{ uri: uri }}
        headerBarTitle={filename}
        onTapBack={() => {
          navigation.goBack();
        }}
        onTapMore={() => {
          Alert.alert("onTapMore");
        }}
        onPausedChange={(state) => {
          // Alert.alert(`onPausedChange: ${state}`);
          setPaused(state);
        }}
        // videoHeight={videoHeight}
        paused={paused}
        isFullScreen={isFullScreen}
        navigation={navigation}
      />
    </View>
  );
};

export default VideosDetailScreen;

const styles = StyleSheet.create({});



