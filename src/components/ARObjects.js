import React, {Component} from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroConstants,
  ViroNode,
} from '@viro-community/react-viro';
import {Toast} from '../utils';
export default class ARObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
    };
    this._onInitialized = this._onInitialized.bind(this);
  }
  componentWillUnmount = () => {
    this.props.sceneNavigator.pop();
  };
  placeARObjects = () => {
    return (
      <ViroNode position={[0.0, 0.0, 0.5]}>
        <ViroAmbientLight color="#fff" />

        <Viro3DObject
          source={require('../assets/objects/arrow/Arrow5.obj')}
          resources={[require('../assets/objects/arrow/Arrow5Albedo.png')]}
          highAccuracyEvents={true}
          position={[0, -5, 0]}
          scale={[0.2, 0.2, 0.2]}
          rotation={[90, 0, 0]}
          type="OBJ"
        />
      </ViroNode>
    );
  };

  render() {
    return <ViroARScene displayPointCloud>{this.placeARObjects()}</ViroARScene>;
  }
  _onInitialized(state, reason) {
    this.setState(
      {
        tracking:
          state === ViroConstants.TRACKING_NORMAL ||
          state === ViroConstants.TRACKING_LIMITED,
      },
      () => {
        if (this.state.tracking) {
          Toast('All set!');
          console.warn(state);
        } else {
          Toast('nothing!!');
        }
      },
    );
  }
}
