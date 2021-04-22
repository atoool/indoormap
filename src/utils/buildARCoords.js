import {lngLatToWorld} from '.';

export function buildARCoords(path, devicePos) {
  let pos = [];
  for (let i = 0; i < path.length; i++) {
    const coords = lngLatToWorld(
      path[i].x,
      path[i].z,
      path[i].angle,
      devicePos,
    );
    pos.push(coords);
  }
  return pos;
}
