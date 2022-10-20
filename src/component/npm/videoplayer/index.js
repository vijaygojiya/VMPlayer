import {View} from 'react-native';
import React from 'react';

const VideoPlayer = () => {
  const renderContent = () => {};
  const onLayout = () => {};
  return (
    <View onLayout={onLayout} style={this.props.customStyles.wrapper}>
      {renderContent()}
    </View>
  );
};

export default VideoPlayer;

// const styles = StyleSheet.create({});
