import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styleConfig from '../../../utils/styleConfig';
import AppImages from '../../../assets/images';
import CommonToolbar from '../../../component/custom/commontoolbar';

type VideosScreenProps = {
  navigation: any;
};

const VideosScreen: React.FC<VideosScreenProps> = () => {
  return (
    <View style={styles.mainContainer}>
      <CommonToolbar
        isRightButton={true}
        isLeftButton={true}
        leftIcon={AppImages.burger}
        rightIcon={AppImages.ic_search_outline}
        title="Videos"
        rightIconStyle={{}}
        leftIconStyle={{}}
      />
      <Text>VideosScreen</Text>
    </View>
  );
};

export default VideosScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flContainer: {
    marginVertical: styleConfig.smartScale(10),
    marginHorizontal: styleConfig.smartWidthScale(8),
  },
});
