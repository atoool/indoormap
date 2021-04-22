import {
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
} from '@viro-community/react-viro';
import React from 'react';
import {lngLatToWorld} from '../utils';

const ARObjects = ({path, devicePos, arrow}) => {
  if (path.length === 0) {
    return undefined;
  }
  const ARTags = path.map((item, indx) => {
    const coords = lngLatToWorld(item.x, item.z, devicePos);
    const scale = 1;
    // const distance = distanceBetweenPoints(this.state.location, {
    //   latitude: item.lat,
    //   longitude: item.lng,
    // });
    return (
      <ViroNode
        key={indx}
        scale={[scale, scale, scale]}
        rotation={[0, 0, 0]}
        position={[coords.x, 0, coords.z]}>
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={arrow}
          highAccuracyEvents={true}
          position={[0, 1, 0]}
          // rotation={[90, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          materials={['arrow']}
          type="OBJ"
        />
        {/* <ViroText
          text={`${Number(distance).toFixed(2)} km away`}
          style={styles.helloWorldTextStyle}
          position={[0, -0.75, 0]}
        /> */}
      </ViroNode>
    );
  });
  return ARTags;
};

export default ARObjects;
