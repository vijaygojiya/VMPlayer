import React from "react";
import { View } from "react-native";
import { Text, Pressable, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Images, Layout } from "../../theme";

interface FolderListItemPropsType {
  title: string;
  count: number;
  onItemPress: (name: string, count: number) => void;
}

const FolderListItem: React.FC<FolderListItemPropsType> = (props) => {
  const { title, count, onItemPress } = props;

  return (
    <Pressable
      android_ripple={{ color: Colors.grey }}
      onPress={() => {
        onItemPress(title, count);
      }}
      style={[Layout.rowHCenter, styles.rowContainer]}
    >
      <Image source={Images.folderFilled} style={styles.folderIconStyle} />
      <View style={[styles.titleContainer]}>
        <Text
          numberOfLines={2}
          style={[Fonts.textMedium, styles.titleTextStyle]}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[Fonts.textSmall, styles.countTextStyle]}
        >
          {count} {count > 1 ? "videos" : "video"}
        </Text>
      </View>
    </Pressable>
  );
};

export default FolderListItem;

const styles = StyleSheet.create({
  folderIconStyle: {
    height: 55,
    width: 55,
    marginEnd: 10,
    tintColor: Colors.blue,
  },
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderRadius: 18,
  },
  titleContainer: {
    flex: 1,
  },
  titleTextStyle: {
    color: Colors.lightGreyBlue,
  },
  countTextStyle: {
    color: Colors.lightGreyBlue,
    opacity: 0.5,
  },
});
