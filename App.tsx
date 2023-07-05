import {StatusBar} from 'react-native';
import React from 'react';

import ApplicationNavigator from './src/navigators/Application';
import {Colors, Layout} from './src/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <StatusBar backgroundColor={Colors.blue} />
      <ApplicationNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
