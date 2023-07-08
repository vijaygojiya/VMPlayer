import { FlatList, ListRenderItem, Platform, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Album, CameraRoll } from "@react-native-camera-roll/camera-roll";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Images, Layout, StyleConfig } from "../../theme";
import { FolderListItem, MenuBar } from "../../components";
import styles from "./styles";
import { Routes } from "../../navigators/routes";
import { FoldersListScreenType } from "../../navigators/types/navigation";
import { useMMKVObject } from "react-native-mmkv";
import { LocalStorageKeys } from "../../utils/Enum";

const showToast = (_: any) => {};

const permissionVideo = StyleConfig.isAndroid
  ? Number(Platform.Version) >= 33
    ? PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  : PERMISSIONS.IOS.PHOTO_LIBRARY;

const FoldersList = (props: FoldersListScreenType) => {
  // const [isGridView, setIsGridView] = useState(false);
  const [folders, setFolders] = useMMKVObject<Album[]>(
    LocalStorageKeys.folders
  );
  const { navigation } = props;

  const askPermission = useCallback(async () => {
    try {
      const result = await request(permissionVideo);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          showToast(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          showToast("The permission is denied and not rerequestable anymore");
          break;
        case RESULTS.GRANTED:
          fetchAllVideoFolders();
          break;
        case RESULTS.BLOCKED:
          showToast("The permission is denied and not rerequestable anymore");
          break;
      }
    } catch (error) {
      showToast(`${error?.message}`);
    }
  }, []);
  const checkLocationPermission = useCallback(async () => {
    try {
      const result = await check(permissionVideo);
      console.log("==>", result);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          showToast(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          askPermission();
          break;
        case RESULTS.GRANTED:
          fetchAllVideoFolders();
          break;
        case RESULTS.BLOCKED:
          showToast("The permission is denied and not rerequestable anymore");
          break;
      }
    } catch (error) {
      showToast(`${error?.message}`);
    }
  }, [askPermission]);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  const fetchAllVideoFolders = async () => {
    try {
      const data = await CameraRoll.getAlbums({ assetType: "Videos" });
      const sortData = data.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      setFolders(sortData);
    } catch (error) {
      console.log("eerr-~~~~~~~~~~~~~~~>", error);
    }
  };

  const handleOpenVideosList = (groupName: string, count: number) => {
    navigation.navigate(Routes.VideosList, { groupName, count });
  };

  const renderFolderItem: ListRenderItem<Album> = (prop) => {
    const { item } = prop;
    return <FolderListItem {...item} onItemPress={handleOpenVideosList} />;
  };
  return (
    <View style={Layout.fill}>
      <MenuBar
        leftIcon={Images.hamburger}
        title="Folders"
        rightIcon={Images.search}
        leftIconStyle={styles.hamburgerIconStyle}
        onRIghtClickListener={() => {
          // setIsGridView((v) => !v);
        }}
      />
      <FlatList
        bounces={false}
        overScrollMode={"never"}
        keyExtractor={(_, index) => index.toString()}
        data={folders ?? []}
        renderItem={renderFolderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flContainer}
        // {...(isGridView && { numColumns: 3 })}
      />
    </View>
  );
};

export default FoldersList;
