/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

const useGeolocation = setCurrentLoc => {
  useEffect(() => {
    Geolocation.watchPosition(
      async pos => {
        const xzCoords = {
          x: pos.coords.longitude,
          z: pos.coords.latitude,
          angle: pos.coords.heading,
        };
        setCurrentLoc(xzCoords, true);
      },
      e => {
        console.log(e);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0.1,
        showLocationDialog: true,
        forceRequestLocation: true,
        fastestInterval: 1000,
        accuracy: {android: 'high'},
      },
    );

    return () => {
      Geolocation.stopObserving();
    };
  }, []);
};

export default useGeolocation;
