import React from 'react';
import {View} from 'react-native';

const BarcodeMask = () => {
  const Bar = ({height, width, top, bottom, left, right}) => {
    const styles = {
      position: 'absolute',
      top,
      left,
      bottom,
      right,
      backgroundColor: '#fff',
      height,
      width,
    };
    return <View style={styles} />;
  };
  const container = {height: '90%', width: '70%'};
  return (
    <View style={container}>
      {Bar({height: 3, width: 40, top: 20, left: 20})}
      {Bar({height: 40, width: 3, top: 20, left: 20})}
      {Bar({height: 3, width: 40, bottom: 20, left: 20})}
      {Bar({height: 40, width: 3, bottom: 20, left: 20})}
      {Bar({height: 3, width: 40, top: 20, right: 20})}
      {Bar({height: 40, width: 3, top: 20, right: 20})}
      {Bar({height: 3, width: 40, bottom: 20, right: 20})}
      {Bar({height: 40, width: 3, bottom: 20, right: 20})}
    </View>
  );
};

export default BarcodeMask;
