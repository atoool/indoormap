import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, GradientWrapper} from '../../components';
import {Colors} from '../../styles';
import {constants} from '../../utils';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <GradientWrapper>
        <Button
          // rightIcon
          title={constants.CREATEPATH}
          style={styles.button}
          color={Colors.dark}
          onPress={() => {
            navigation.navigate(constants.CREATEPATH);
          }}
        />
      </GradientWrapper>
      <GradientWrapper>
        <Button
          // rightIcon
          title={constants.AR}
          style={styles.button}
          color={Colors.dark}
          onPress={() => {
            navigation.navigate(constants.AR);
          }}
        />
      </GradientWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 0,
    borderRadius: 0,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.secondaryGray,
  },
});

export default Home;
