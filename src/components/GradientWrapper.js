import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {constants} from '../utils';

const GradientWrapper = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={constants.colorGrad}
      style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});
export default GradientWrapper;
