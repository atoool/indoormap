/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {constants} from '../utils';

const useServerSync = ({update}) => {
  useEffect(() => {
    const subscriber = firestore()
      .collection(constants.collection)
      .doc(constants.doc)
      .onSnapshot(documentSnapshot => {
        update(documentSnapshot.data().data);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
};

export default useServerSync;
