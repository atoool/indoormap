import {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

const useGeolocation = (path, setPath, start) => {
  useEffect(() => {
    start &&
      Geolocation.watchPosition(
        async pos => {
          const xzCoords = {
            x: pos.coords.longitude,
            z: pos.coords.latitude,
            angle: pos.coords.heading,
          };
          path.push(xzCoords);
          setPath([...path]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);
};

export default useGeolocation;
