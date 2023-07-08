import { FlatList, ListRenderItem, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import {
  PhotoIdentifier,
  CameraRoll,
} from "@react-native-camera-roll/camera-roll";
import { MenuBar, VideoListItem } from "../../components";
import { Routes } from "../../navigators/routes";
import styles from "./styles";
import { VideosListScreenType } from "../../navigators/types/navigation";
import { useMMKVObject } from "react-native-mmkv";
import { Images, Layout } from "../../theme";

const VideosList = (props: VideosListScreenType) => {
  const { navigation, route } = props;
  const { groupName, count } = route.params;
  const [videos, setVideos] = useMMKVObject<PhotoIdentifier[]>(groupName);

  useEffect(() => {
    getVideosData();
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // const openBottomShhet = () => {
  //   // bottomSheetRef?.current?.expand();\
  //   bottomSheetRef?.current?.snapToIndex(0);
  // };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const getVideosData = async () => {
    try {
      const videosData = await CameraRoll.getPhotos({
        first: count,
        assetType: "Videos",
        groupName: groupName,
        include: [
          "filename",
          "fileSize",
          "location",
          "imageSize",
          "playableDuration",
          "orientation",
        ],
      });

      setVideos(videosData.edges);
    } catch (error) {
      console.log("err0", error);
    }
  };

  const renderVideoDetailItem: ListRenderItem<PhotoIdentifier> = (props) => {
    const { item, index } = props;
    const openVideo = () => {
      if (videos?.length) {
        navigation.navigate(Routes.VideoDetail, { videos: videos, index });
      }
    };
    return <VideoListItem {...item} onVideoItemPress={openVideo} />;
  };

  return (
    <View style={[Layout.fill]}>
      <MenuBar
        leftIcon={Images.arrow}
        title={groupName}
        onLeftClickListener={navigation.goBack}
      />
      <FlatList
        data={videos}
        renderItem={renderVideoDetailItem}
        bounces={false}
        overScrollMode={"never"}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flContainer}
        // onEndReached={fetchMoreVideo}
      />
      <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <Text>af</Text>
      </BottomSheet>
    </View>
  );
};

export default VideosList;
