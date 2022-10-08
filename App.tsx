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
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppContainer from './src/router';

const App = () => {
  return (
    <View style={styles.mainContainer} >
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
});

export default App;
