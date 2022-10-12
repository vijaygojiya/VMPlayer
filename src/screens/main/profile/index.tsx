import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styleConfig from '../../../utils/styleConfig';

type ProfileScreenProps = {
  navigation: any;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
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
