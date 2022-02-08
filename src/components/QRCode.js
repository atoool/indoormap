import React from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from './BarcodeMask';

const QRCode = ({onScan}) => {
  return (
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onGoogleVisionBarcodesDetected={({barcodes}) => {
        if (barcodes.length > 0) {
          if (barcodes[0].type === RNCamera.Constants.BarCodeType.qr) {
            onScan(barcodes[0].data);
          }
        }
      }}>
      <BarcodeMask />
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default QRCode;
