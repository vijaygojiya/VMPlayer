import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';
import SplashScreen from '../screens/auth/splash';
import VideosDetailList from '../screens/main/videosDetailList';
import VideosDetailScreen from '../screens/main/videoDetail';
import CustomTabBar from './customtabbar';
import LocalFolderScreen from '../screens/main/localFolders';
import ProfileScreen from '../screens/main/profile';
import VideosScreen from '../screens/main/video';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => {
        return <CustomTabBar {...props} />;
      }}>
      <Tab.Screen
        key="HomeScreenTab"
        name={routes.Local}
        component={LocalFolderScreen}
      />
      <Tab.Screen
        key="SearchScreenTab"
        name={routes.Video}
        component={VideosScreen}
      />
      <Tab.Screen
        key="ProfileScreenTab"
        name={routes.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={routes.Splash}>
        <Stack.Screen name={routes.Splash} component={SplashScreen} />
        <Stack.Screen name={routes.Dashboard} component={TabNavigator} />
        <Stack.Screen
          name={routes.VideosDetail}
          component={VideosDetailScreen}
        />
        <Stack.Screen
          name={routes.VideosDetailList}
          component={VideosDetailList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
