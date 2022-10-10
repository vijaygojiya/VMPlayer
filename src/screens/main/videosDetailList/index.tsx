import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, StyleSheet} from 'react-native';
import {
  Album,
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';
import VideoDetailListItem from '../../../component/custom/videoDetailListItem';
import {routes} from '../../../router/routes';

const VideosDetailList = () => {
  const [videos, setVideos] = useState<PhotoIdentifier[]>([]);
  const navigation = useNavigation();
  const myRoutes = useRoute();
  const {groupName} = myRoutes.params;
  useEffect(() => {
    getVideosData();
  }, []);

  const getVideosData = async () => {
    try {
      const videosData = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Videos',
        groupName: groupName,
        include: ['fileSize', 'imageSize', 'filename', 'playableDuration'],
      });
      console.log('===>', videosData);
      setVideos(videosData.edges);
    } catch (error) {
      console.log('err0', error);
    }
  };



  const renderVideoDetailItem = props => {
    const {item, index} = props;
    const openVideo = () => {
      navigation.navigate(routes.VideosDetail, {uri: item.node.image.uri});
    };
    return <VideoDetailListItem {...item} onVideoItemPress={openVideo} />;
  };



  return (
    <View style={styles.rowContainer}>
      <FlatList data={videos} renderItem={renderVideoDetailItem} />
    </View>
  );
};

export default VideosDetailList;

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
