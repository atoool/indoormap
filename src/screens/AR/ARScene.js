/* eslint-disable prettier/prettier */
import React from 'react';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {BackHandler, StyleSheet, View} from 'react-native';
import {ARObjects} from '../../components';

export default class ARScene extends React.Component {
  state = {
    scene: ARObjects,
  };

  componentDidMount = () => {
    this.back = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({scene: null}, () => {
        this.props.navigation.pop();
      });
      return true;
    });
  };
  componentWillUnmount = () => {
    this.back.remove();
  };
  render() {
    const {scene} = this.state;
    if (!scene) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ViroARSceneNavigator
          initialScene={{
            scene,
          }}
          autofocus={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%', position: 'absolute'},
});
