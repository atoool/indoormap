import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors, Typography} from '../styles';
import Loader from './Loader';

const Button = ({
  title,
  onPress,
  loading,
  style,
  titleStyle,
  subtitle,
  scanButton,
  disabled,
  color = Colors.secondaryRed,
  rightIcon = false,
}) => (
  <TouchableOpacity
    disabled={disabled || loading}
    onPress={onPress}
    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
    <View
      style={[
        styles.btnStyle,
        style,
        // {backgroundColor: disabled ? Colors.primary4 : color},
      ]}>
      <View
        style={[
          styles.titleView,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            justifyContent: scanButton ? 'space-between' : 'center',
          },
        ]}>
        <View>
          {loading && <Loader small={true} />}
          {!loading && (
            <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
          )}
          {scanButton && !loading && (
            <Text style={styles.subtitleStyle}>{subtitle}</Text>
          )}
        </View>
        {rightIcon && (
          <Icon
            name="chevron-right"
            color={Colors.secondaryRed}
            size={15}
            style={styles.iconStyle}
          />
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    padding: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textStyle: Typography.buttonTitleText,
  subtitleStyle: {...Typography.normal12White, marginBottom: 5},
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconStyle: {
    color: Colors.WHITE,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    right: 20,
  },
});

export default Button;
