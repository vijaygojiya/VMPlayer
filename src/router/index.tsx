import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';
import SplashScreen from '../screens/auth/splash';
import DashboardScreen from '../screens/main/dashboard';


const Stack = createNativeStackNavigator();




function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'none'}}
        initialRouteName={routes.Splash}>
        <Stack.Screen name={routes.Splash} component={SplashScreen} />
        <Stack.Screen name={routes.Dashboard} component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
