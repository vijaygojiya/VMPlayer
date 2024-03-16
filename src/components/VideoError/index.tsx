import React from 'react';
import {Text, View} from 'react-native';
import {Colors, Layout} from '../../theme';

type Props = {
  isError: boolean;
};

const VideoError = React.memo<Props>(function VideoError({isError}) {
  if (!isError) {
    return null;
  }
  return (
    <View
      style={[
        Layout.center,
        Layout.absoluteFillObject,
        {backgroundColor: Colors.black50},
      ]}>
      <Text>Error</Text>
    </View>
  );
});

export default VideoError;
