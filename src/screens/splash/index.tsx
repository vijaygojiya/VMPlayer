import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigators/routes';
import {Images, Layout} from '../../theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAppNavFlow();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAppNavFlow = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Routes.FoldersList}],
      }),
    );
  };
  return (
    <View style={[Layout.fill, Layout.center]}>
      <Image
        source={Images.appLogo}
        resizeMode="contain"
        style={styles.splashLogoIcon}
      />
    </View>
  );
};

export default SplashScreen;
