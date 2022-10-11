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
import styleConfig from '../../../utils/styleConfig';
import {routes} from '../../../router/routes';
import FolderListItem from '../../../component/custom/videoFolderListItem';

type LocalFolderScreenProps = {
  navigation: any;
};

const LocalFolderScreen: React.FC<LocalFolderScreenProps> = ({navigation}) => {
  const [folders, setFolders] = useState<Album[]>([]);

  useEffect(() => {
    checkLocationPermission();
  }, []);
  const checkLocationPermission = () => {
    check(
      styleConfig.isAndroid
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
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
      styleConfig.isAndroid
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
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
      const data = await CameraRoll.getAlbums({assetType: 'Videos'});
      const sortData = data.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      setFolders(sortData);
    } catch (error) {
      console.log('eerr-', error);
    }
  };

  const renderFolderItem = (prop: {item: Album; index: any}) => {
    const {item} = prop;
    return <FolderListItem {...item} onItemPress={navigateToVideoDetailList} />;
  };

  const navigateToVideoDetailList = (groupName: string) => {
    navigation.navigate(routes.VideosDetailList, {groupName});
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        bounces={false}
        overScrollMode={'never'}
        keyExtractor={(_, index) => index.toString()}
        data={folders}
        renderItem={renderFolderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flContainer}
      />
    </View>
  );
};

export default LocalFolderScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flContainer: {
    marginVertical: styleConfig.smartScale(10),
    marginHorizontal: styleConfig.smartWidthScale(8),
  },
});
