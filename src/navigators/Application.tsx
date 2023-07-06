import { NavigationContainer } from "@react-navigation/native";

import React from "react";

import { Routes } from "./routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FoldersList, SplashScreen, VideoDetail, VideosList } from "../screens";
import { RootStackParamList } from "./types/navigation";
import { StyleSheet } from "react-native";
import { Colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_left",
          contentStyle: styles.navigationContainer,
        }}
      >
        <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
        <Stack.Screen name={Routes.FoldersList} component={FoldersList} />
        <Stack.Screen name={Routes.VideosList} component={VideosList} />
        <Stack.Screen name={Routes.VideoDetail} component={VideoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: Colors.white,
  },
});
