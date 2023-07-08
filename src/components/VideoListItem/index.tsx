import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import React from "react";
import { Text, Pressable, Image, StyleSheet, View } from "react-native";
import { Colors, Fonts } from "../../theme";
import Methods from "../../utils/Methods";
import FastImage from "react-native-fast-image";

interface VideoListItemProps extends PhotoIdentifier {
  onVideoItemPress: () => void;
}

const VideoListItem: React.FC<VideoListItemProps> = (props) => {
  const { filename, playableDuration, uri } = props.node.image;
  const { onVideoItemPress } = props;

  return (
    <Pressable
      android_ripple={{ color: Colors.grey }}
      onPress={onVideoItemPress}
      style={styles.rowContainer}
    >
      <FastImage
        resizeMode="cover"
        source={{ uri }}
        style={styles.folderIconStyle}
      />
      <View style={styles.titleContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={[Fonts.textNormal, Fonts.textSemibold, styles.titleTextStyle]}
        >
          {filename}
        </Text>
        <Text
          numberOfLines={1}
          style={[Fonts.textNormal, styles.countTextStyle]}
        >
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
    backgroundColor: Colors.grey,
  },
  rowContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderRadius: 18,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  titleTextStyle: {
    color: Colors.lightGreyBlue,
  },
  countTextStyle: {
    color: Colors.lightGreyBlue,
    fontSize: 13,
    opacity: 0.5,
  },
});
