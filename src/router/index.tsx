import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';
import SplashScreen from '../screens/auth/splash';
import DashboardScreen from '../screens/main/dashboard';
import VideosDetailList from '../screens/main/videosDetailList';
import VideosDetailScreen from '../screens/main/videoDetail';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right', contentStyle:{backgroundColor:'white'} }}
        initialRouteName={routes.Splash}>
        <Stack.Screen name={routes.Splash} component={SplashScreen} />
        <Stack.Screen name={routes.Dashboard} component={DashboardScreen} />
      <Stack.Screen name={routes.VideosDetail} component={VideosDetailScreen} />
        <Stack.Screen
          name={routes.VideosDetailList}
          component={VideosDetailList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
