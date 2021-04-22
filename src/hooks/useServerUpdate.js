import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {constants} from '../utils';

const useServerUpdate = ({data, clear}) => {
  useEffect(() => {
    const mount = async () => {
      clear &&
        (await firestore()
          .collection(constants.collection)
          .doc(constants.doc)
          .update({data})
          .catch(() => {}));
    };
    mount();
  }, [clear, data]);
};

export default useServerUpdate;
