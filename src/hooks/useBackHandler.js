/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackHandler = onPress => {
  useEffect(() => {
    const backEvent = BackHandler.addEventListener('hardwareBackPress', () => {
      onPress();
      return true;
    });
    return () => {
      backEvent.remove();
    };
  }, []);
};

export default useBackHandler;
