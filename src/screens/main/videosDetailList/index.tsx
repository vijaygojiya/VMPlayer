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
import AppImages from '../../../assets/images';
import CommonToolbar from '../../../component/custom/commontoolbar';

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
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CommonToolbar
        isRightButton={true}
        isLeftButton={true}
        leftIcon={AppImages.back}
        onLeftClickListener={goBack}
        rightIcon={AppImages.ic_more}
        title={groupName}
        textStyle={styles.headerTitleStyle}
        rightIconStyle={{transform: [{rotate: '90deg'}]}}
        leftIconStyle={{}}
      />
      <FlatList
        data={videos}
        renderItem={renderVideoDetailItem}
        bounces={false}
        overScrollMode={'never'}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flContainer}
      />
    </View>
  );
};

export default VideosDetailList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flContainer: {
    marginHorizontal: styleConfig.smartWidthScale(8),
  },
  headerTitleStyle: {
    fontSize: styleConfig.countPixelRatio(16),
  },
});
