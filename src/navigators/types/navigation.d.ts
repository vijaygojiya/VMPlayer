import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "../routes";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

type RootStackParamList = {
  [Routes.SplashScreen]: undefined;
  [Routes.FoldersList]: undefined;
  [Routes.VideosList]: { groupName: string; count: number };
  [Routes.VideoDetail]: { videos: PhotoIdentifier[]; index: number };
};

export type SplashScreenType = NativeStackScreenProps<
  RootStackParamList,
  Routes.SplashScreen
>;
export type FoldersListScreenType = NativeStackScreenProps<
  RootStackParamList,
  Routes.FoldersList
>;

export type VideosListScreenType = NativeStackScreenProps<
  RootStackParamList,
  Routes.VideosList
>;

export type VideoDetailScreenType = NativeStackScreenProps<
  RootStackParamList,
  Routes.VideoDetail
>;
