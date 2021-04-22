import React, {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Button, GradientWrapper, Input} from '../../components';
import {ARContext} from '../../context/ARContext';
import useServerUpdate from '../../hooks/useServerUpdate';
import {Colors, height, Typography} from '../../styles';
import {getCurrentLoc} from '../../utils';

const CreatePath = ({navigation}) => {
  const [path, setPath] = useState([]);
  const [dest, setDest] = useState('');
  const [destData, setDestData] = useState([]);
  const [clear, setClear] = useState(false);
  const [start, setStart] = useState(false);

  const {data} = useContext(ARContext);

  useServerUpdate({data: destData, clear});

  const onSetPath = async () => {
    const temp = await getCurrentLoc().catch(e => {});
    temp && setPath([...path, temp]);
  };
  // useGeolocation(path, onSetPath, start);
  const onSavePath = async () => {
    if (!dest || dest === '') {
      // eslint-disable-next-line no-alert
      alert('Enter the destination name to save path');
    } else {
      let temp = data;
      temp.push({pathName: dest, path});
      setDestData([...temp]);
      setClear(true);
      navigation.pop();
    }
  };

  const onStart = () => {
    if (!dest || dest === '') {
      // eslint-disable-next-line no-alert
      alert('Enter the destination name to save path');
    } else {
      setStart(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientWrapper styles={styles.wrapper}>
        {!start ? (
          <Input
            placeholder="Enter destination name"
            value={dest}
            onChangeText={txt => setDest(txt)}
            style={styles.input}
          />
        ) : (
          <Text style={styles.coords}>
            {path.length !== 0
              ? `Way point ${path.length}: \n
              lon: ${path[path.length - 1].x}, lat: ${
                  path[path.length - 1].z
                },\n accuracy: ${path[path.length - 1].accuracy}`
              : 'no way point coordinates found yet...'}
          </Text>
        )}
      </GradientWrapper>
      <GradientWrapper>
        <Button
          title={!start ? 'START' : 'SET WAY POINT'}
          onPress={!start ? onStart : onSetPath}
          style={styles.button}
        />
      </GradientWrapper>
      <GradientWrapper>
        <Button
          title="DESTINATION REACHED"
          onPress={onSavePath}
          style={styles.button}
        />
      </GradientWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  wrapper: {justifyContent: 'space-evenly'},
  input: {marginHorizontal: 32, marginVertical: height / 6},
  button: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 0,
    borderRadius: 0,
    borderTopWidth: 0.3,
    borderTopColor: Colors.secondaryGray,
  },
  coords: {
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
    borderRadius: 0,
    borderTopWidth: 0.3,
    borderTopColor: Colors.secondaryGray,
    ...Typography.bold13White,
  },
});
export default CreatePath;
