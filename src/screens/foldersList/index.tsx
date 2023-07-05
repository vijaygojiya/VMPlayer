import {FlatList, ListRenderItem, Platform, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Album, CameraRoll} from '@react-native-camera-roll/camera-roll';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {StyleConfig} from '../../theme';
import {FolderListItem} from '../../components';
import styles from './styles';
import {Routes} from '../../navigators/routes';
import {useNavigation} from '@react-navigation/native';

const showToast = (_: any) => {};

const permissionVideo = StyleConfig.isAndroid
  ? Number(Platform.Version) >= 33
    ? PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  : PERMISSIONS.IOS.PHOTO_LIBRARY;

const FoldersList = () => {
  const [folders, setFolders] = useState<Album[]>([]);
  const navigation = useNavigation();

  const askPermission = useCallback(async () => {
    try {
      const result = await request(permissionVideo);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          showToast(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          showToast('The permission is denied and not rerequestable anymore');
          break;
        case RESULTS.GRANTED:
          fetchAllVideoFolders();
          break;
        case RESULTS.BLOCKED:
          showToast('The permission is denied and not rerequestable anymore');
          break;
      }
    } catch (error) {
      showToast(error);
    }
  }, []);
  const checkLocationPermission = useCallback(async () => {
    try {
      const result = await check(permissionVideo);
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
          fetchAllVideoFolders();
          break;
        case RESULTS.BLOCKED:
          showToast('The permission is denied and not rerequestable anymore');
          break;
      }
    } catch (error) {
      showToast(error);
    }
  }, [askPermission]);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  const fetchAllVideoFolders = async () => {
    try {
      const data = await CameraRoll.getAlbums({assetType: 'Videos'});
      const sortData = data.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      setFolders(sortData);
    } catch (error) {
      console.log('eerr-~~~~~~~~~~~~~~~>', error);
    }
  };

  const handleOpenVideosList = (groupName: string, count: number) => {
    navigation.navigate(Routes.VideosList, {groupName, count});
  };

  const renderFolderItem: ListRenderItem<Album> = prop => {
    const {item} = prop;
    return <FolderListItem {...item} onItemPress={handleOpenVideosList} />;
  };
  return (
    <View>
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

export default FoldersList;
