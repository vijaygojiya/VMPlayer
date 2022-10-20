import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import AppImages from '../assets/images';
import colors from '../utils/colors';
import {Type_Of_TabBar} from '../utils/enum';
import string from '../utils/string';
import styleConfig from '../utils/styleConfig';
import GS from '../utils/styles';
import ItemTab from './itemtab';
import {routes} from './routes';

const TabBarList = [
  {
    Name: string.Local,
    ActiveIcon: AppImages.folder_filled,
    InActiveIcon: AppImages.folder_outline,
    Navigation: routes.Local,
  },
  {
    Name: string.Videos,
    ActiveIcon: AppImages.ic_heart_filled,
    InActiveIcon: AppImages.ic_heart_outline,
    Navigation: routes.Video,
  },
  {
    Name: string.Profile,
    ActiveIcon: AppImages.ic_home_filled,
    InActiveIcon: AppImages.ic_home_outline,
    Navigation: routes.Profile,
  },
];

const CustomTabBar = (props: {navigation: any}) => {
  const {navigation} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onTabClick = (index: React.SetStateAction<number>) => {
    setSelectedIndex(index);
    switch (index) {
      case Type_Of_TabBar.Local:
        navigation.navigate(routes.Local);
        break;
      case Type_Of_TabBar.Videos:
        navigation.navigate(routes.Video);
        break;
      case Type_Of_TabBar.Profile:
        navigation.navigate(routes.Profile);
        break;
    }
  };

  const renderTabItem: React.FC<{
    item: {
      Name: string;
      ActiveIcon: string;
      InActiveIcon: string;
      Navigation: string;
    };
    index: number;
  }> = ({item, index}) => {
    return (
      <ItemTab
        item={item}
        key={`custom-tab-${index}`}
        index={index}
        onTabClickListener={onTabClick}
        isSelected={selectedIndex === index}
      />
    );
  };

  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'always'}}
      style={styles.saContainer}>
      <FlatList
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.flTabContainer}
        data={TabBarList}
        renderItem={renderTabItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saContainer: {
    backgroundColor: colors.white,
    borderRadius: styleConfig.countPixelRatio(15),
    shadowColor: colors.darkGreyBlue,
    ...GS.shadowEffect,
  },
  flTabContainer: {
    justifyContent: 'space-around',
    flex: 1,
  },
});
export default CustomTabBar;
