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

type VideosScreenProps = {
  navigation: any;
};

const VideosScreen: React.FC<VideosScreenProps> = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
      <Text>VideosScreen</Text>
    </View>
  );
};

export default VideosScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flContainer: {
    marginVertical: styleConfig.smartScale(10),
    marginHorizontal: styleConfig.smartWidthScale(8),
  },
});
