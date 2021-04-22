/* eslint-disable prettier/prettier */
import React, {Component, useContext, useState} from 'react';
import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroConstants,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import arrow from './res/Arrow5.obj';
import {useBackHandler, useCurrentLocation} from '../../../hooks';
import {ARContext} from '../../../context/ARContext';
import {
  BackHandler,
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {ARObjects} from '../../../components';
import Geolocation from 'react-native-geolocation-service';
import {lngLatToWorld} from '../../../utils';
ViroMaterials.createMaterials({
  arrow: {
    diffuseTexture: require('./res/Arrow5Albedo.png'),
  },
});
const Toast = message => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

class HelloWorldSceneAR extends Component {
  static contextType = ARContext;
  constructor(props) {
    super(props);
    this.state = {
      locationReady: false,
      location: undefined,
      nearbyPlaces: [],
      tracking: false,
      compassHeading: 0,
    };
    this._onInitialized = this._onInitialized.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.listener = undefined;
  }

  componentDidMount() {
    PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')
      .then(result => {
        if (result) {
          this.getCurrentLocation();
        } else {
          PermissionsAndroid.request(
            'android.permission.ACCESS_FINE_LOCATION',
          ).then(granted => {
            if (granted) {
              this.getCurrentLocation();
            }
          });
        }
      })
      .catch(error => {});
  }

  componentWillUnmount() {
    Geolocation.stopObserving();
  }

  getCurrentLocation = () => {
    const geoSuccess = result => {
      this.setState({
        location: {
          x: result.coords.longitude,
          z: result.coords.latitude,
          angle: result.coords.heading,
        },
        locationReady: true,
      });
    };

    this.listener = Geolocation.watchPosition(geoSuccess, error => {}, {
      enableHighAccuracy: true,
      distanceFilter: 1,
      showLocationDialog: true,
      forceRequestLocation: true,
      fastestInterval: 10,
      interval: 100,
      useSignificantChanges: true,
      showsBackgroundLocationIndicator: true,
      accuracy: {android: 'high'},
    });
  };

  placeARObjects = () => {
    if (this?.context?.path?.length === 0) {
      return undefined;
    }
    return this?.context?.path?.map((item, indx) => {
      const coords = lngLatToWorld(item.x, item.z, this.state.location);
      const scale = 0.2;
      console.warn(coords.x);
      return (
        <Viro3DObject
          source={arrow}
          position={[coords.x, -5, coords.z]}
          rotation={[90, 0, 0]}
          key={indx}
          scale={[scale, scale, scale]}
          materials={['arrow']}
          type="OBJ"
        />
      );
    });
  };

  render() {
    // const {path} = this.context;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.locationReady && this.placeARObjects()}
      </ViroARScene>
    );
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
        } else {
          //Toast(`Move your device around gently to calibrate AR (${reason}) and compass.`);
        }
      },
    );
  }
}

export default class ARScene extends React.Component {
  state = {
    scene: HelloWorldSceneAR,
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
      <View style={{height: '100%', width: '100%', position: 'absolute'}}>
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
