import {Platform} from 'react-native';

export function lngLatToMerc(lon_deg, lat_deg) {
  //x z world val converting
  let lon_rad = (lon_deg / 180.0) * Math.PI;
  let lat_rad = (lat_deg / 180.0) * Math.PI;
  let sm_a = 6378137.0;
  let x = sm_a * lon_rad;
  let z = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
  return {x, z};
}
export function lngLatToWorld(lng, lat, devicePos) {
  const isAndroid = Platform.OS === 'android';
  const latObj = lat;
  const longObj = lng;
  const latMobile = devicePos.z;
  const longMobile = devicePos.x;

  const deviceObjPoint = lngLatToMerc(longObj, latObj);
  const mobilePoint = lngLatToMerc(longMobile, latMobile);
  const objDeltaZ = deviceObjPoint.z - mobilePoint.z;
  const objDeltaX = deviceObjPoint.x - mobilePoint.x;

  if (isAndroid) {
    let degree = devicePos.angle;
    let angleRadian = (degree * Math.PI) / 180;
    let newObjX =
      objDeltaX * Math.cos(angleRadian) - objDeltaZ * Math.sin(angleRadian);
    let newObjY =
      objDeltaX * Math.sin(angleRadian) + objDeltaZ * Math.cos(angleRadian);
    return {x: newObjX, z: -newObjY};
  }

  return {x: objDeltaX, z: -objDeltaX};
}
