import React, { useEffect } from 'react';
import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { routes } from '../../../router/routes';
import colors from '../../../utils/colors';
import styleConfig from '../../../utils/styleConfig';


type SplashScreenProps = {
  navigation: any;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    navigateToDrawerScreens();
  });

  const navigateToDrawerScreens = () => {
    setTimeout(() => {
      redirection();
    }, 3000);
  };
  const redirection = () => {
    navigation.replace(routes.Dashboard);
  };

  return (
    <View style={[styles.container, isDarkMode ? { backgroundColor: colors.black } : { backgroundColor: colors.white }]}>
      <Text style={[styles.nameStyle, isDarkMode ? { color: colors.white } : { color: colors.black }]} >VM Player</Text>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    fontSize: styleConfig.countPixelRatio(24)
  }
});