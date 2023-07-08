import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { Colors, Fonts, Layout } from "../../theme";
export interface MenuBarProps {
  containerStyle?: ViewStyle;
  title: string;
  textStyle?: TextStyle;
  leftIcon: ImageSourcePropType;
  onLeftClickListener?: () => void;
  leftIconStyle?: ImageStyle;
  rightIcon: ImageSourcePropType;
  onRIghtClickListener?: () => void;
  rightIconStyle?: ImageStyle;
}

const MenuBar = React.memo(
  ({
    containerStyle,
    title,
    textStyle,
    leftIcon,
    onLeftClickListener,

    leftIconStyle,
    rightIcon,
    rightIconStyle,
    onRIghtClickListener,
  }: MenuBarProps) => {
    return (
      <SafeAreaView
        edges={["right", "top", "left"]}
        style={{ backgroundColor: Colors.blue }}
      >
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            styles.container,
            containerStyle,
          ]}
        >
          {leftIcon && (
            <Pressable
              style={[
                Layout.justifyContentCenter,
                Layout.alignItemsCenter,
                styles.iconContainer,
              ]}
              onPress={onLeftClickListener}
              hitSlop={10}
            >
              <Image
                source={leftIcon}
                style={[styles.iconStyle, leftIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <Text
            numberOfLines={1}
            style={[
              Layout.fill,

              Fonts.textRegular,
              Fonts.textBold,

              { color: Colors.white },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && (
            <Pressable
              style={[
                Layout.justifyContentCenter,
                Layout.alignItemsCenter,
                styles.iconContainer,
              ]}
              onPress={onRIghtClickListener}
              hitSlop={10}
            >
              <Image
                source={rightIcon}
                style={[styles.iconStyle, rightIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }
);

export default MenuBar;
