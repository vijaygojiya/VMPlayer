import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Layout} from '../../theme';

type Props = {
  loading?: boolean;
};
const VideoLoader = React.memo<Props>(function VideoLoader({loading}) {
  if (!loading) {
    return null;
  }
  return (
    <View style={[Layout.center, Layout.absoluteFillObject]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
});

export default VideoLoader;
