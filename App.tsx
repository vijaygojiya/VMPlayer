/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AppContainer from './src/router';
import colors from './src/utils/colors';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.darkGreyBlue} />
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
