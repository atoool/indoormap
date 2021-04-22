import Geolocation from 'react-native-geolocation-service';

const getCurrentLoc = () => {
  return new Promise(function (myResolve, myReject) {
    Geolocation.getCurrentPosition(
      async pos => {
        const devicePos = {
          x: pos.coords.longitude,
          z: pos.coords.latitude,
          angle: pos.coords.heading,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
        };
        myResolve(devicePos);
      },
      e => myReject(e),
      {
        enableHighAccuracy: true,
        showLocationDialog: true,
        forceRequestLocation: true,
        accuracy: {android: 'high'},
        maximumAge: 0,
      },
    );
  });
};

export default getCurrentLoc;
