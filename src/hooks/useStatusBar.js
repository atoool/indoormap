import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Colors} from '../styles';

const useStatusBar = () => {
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.transparent);
    StatusBar.setTranslucent(true);
  }, []);
};

export default useStatusBar;
