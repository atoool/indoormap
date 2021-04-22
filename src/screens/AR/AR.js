/* eslint-disable no-alert */
import React, {useContext, useState} from 'react';
import {constants} from '../../utils';
import {Button, GradientWrapper, QRCode} from '../../components';
import {ARContext} from '../../context/ARContext';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import useServerUpdate from '../../hooks/useServerUpdate';

const AR = ({navigation}) => {
  const defaultSelect = constants.defaultSelect;

  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [disableQR, setDisableQR] = useState(false);
  const [select, setSelect] = useState(defaultSelect);

  useServerUpdate({data: [], clear});

  const {getPath} = useContext(ARContext);

  const onSelect = val => {
    if (!disableQR) {
      setLoading(true);
      setSelect(val);
      val !== defaultSelect && getPath(val).catch(() => {});
      setDisableQR(true);
      Alert.alert('Confirm', val + ' selected successfully. Start navigating', [
        {
          text: 'Re-scan',
          onPress: () => setDisableQR(false),
        },
        {text: 'Ok', style: 'cancel'},
      ]);
      setLoading(false);
    }
  };

  const onStart = () => {
    if (select !== defaultSelect) {
      navigation.navigate(constants.ARScene);
    } else {
      alert('Select a destination first');
    }
  };

  const onClear = async () => {
    setClear(true);
    navigation.navigate(constants.HOME);
  };

  return (
    <SafeAreaView style={styles.container}>
      <QRCode onScan={onSelect} />
      <GradientWrapper>
        <Button
          // rightIcon
          title={'START NAVIGATION'}
          style={styles.button}
          color={Colors.dark}
          onPress={onStart}
          loading={loading}
          disabled={loading}
        />
      </GradientWrapper>
      <GradientWrapper>
        <Button
          // rightIcon
          title={'CLEAR ALL DESTINATIONS'}
          style={styles.button}
          color={Colors.dark}
          onPress={onClear}
        />
      </GradientWrapper>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  dropDown: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 0,
    borderRadius: 0,
    borderTopWidth: 0.3,
    borderTopColor: Colors.secondaryGray,
  },
});
export default AR;
