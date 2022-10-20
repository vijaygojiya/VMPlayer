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
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppContainer from './src/router';
import colors from './src/utils/colors';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.blue} />
      <AppContainer />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
