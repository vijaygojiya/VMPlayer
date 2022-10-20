import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppImages from '../../../assets/images';
import CommonToolbar from '../../../component/custom/commontoolbar';
import styleConfig from '../../../utils/styleConfig';

type ProfileScreenProps = {
  navigation: any;
};

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <View style={styles.mainContainer}>
      <CommonToolbar
        isRightButton={true}
        isLeftButton={true}
        leftIcon={AppImages.burger}
        rightIcon={AppImages.ic_search_outline}
        title="Profile"
        rightIconStyle={{}}
        leftIconStyle={{}}
      />
      <Text>Profile</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flContainer: {
    marginVertical: styleConfig.smartScale(10),
    marginHorizontal: styleConfig.smartWidthScale(8),
  },
});
