import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Album, CameraRoll} from '@react-native-camera-roll/camera-roll';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {showToast} from '../../../utils/tost';
import VideoFolderListItem from '../../../component/custom/videoFolderListItem';
import styleConfig from '../../../utils/styleConfig';
import {routes} from '../../../router/routes';

type DashboardScreenProps = {
  navigation: any;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({navigation}) => {
  const [videoFolders, setVideoFolders] = useState<Album[]>([]);

  useEffect(() => {
    checkLocationPermission();
  }, []);
  const checkLocationPermission = () => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        console.log('==>', result);

        switch (result) {
          case RESULTS.UNAVAILABLE:
            showToast(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            askPermission();
            break;
          case RESULTS.GRANTED:
            getData();
            break;
          case RESULTS.BLOCKED:
            showToast('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        showToast(error);
      });
  };

  const askPermission = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            showToast(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            showToast('The permission is denied and not requestable anymore');
            break;
          case RESULTS.GRANTED:
            getData();
            break;
          case RESULTS.BLOCKED:
            showToast('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        showToast(error);
      });
  };

  const getData = async () => {
    try {
      const videos = await CameraRoll.getPhotos({
        first: 5,
        assetType: 'Videos',
      });
      const data = await CameraRoll.getAlbums({assetType: 'Videos'});
      setVideoFolders(data);
    } catch (error) {
      console.log('eerr-', error);
    }
  };

  const renderVideoFolderItem = (prop: {item: Album; index: any}) => {
    const {item, index} = prop;
    return (
      <VideoFolderListItem {...item} onItemPress={navigateToVideoDetailList} />
    );
  };

  const navigateToVideoDetailList = (groupName: string) => {
    navigation.navigate(routes.VideosDetailList,{groupName});
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={videoFolders}
        renderItem={renderVideoFolderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flContainer: {
    marginVertical: styleConfig.smartScale(15),
    marginHorizontal: styleConfig.smartWidthScale(22),
  },
});
