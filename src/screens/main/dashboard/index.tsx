import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
type DashboardScreenProps = {
  navigation: any;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {

  useEffect(() => {
    // hasAndroidPermission();
    getData()
  }, [])

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      getData()
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
    
  }

  const getData = async () => {

try {
  const data = await CameraRoll.getPhotos({first:5,assetType:'Videos'})
  console.log('==>',data);
  
  
} catch (error) {
  console.log('eerr-',error);
  
}
    

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
};

export default DashboardScreen;
