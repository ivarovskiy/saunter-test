import { Marker } from '@react-google-maps/api';
import * as React from 'react';
import { Coordinates } from '../../models/Map';

interface Props {
  position: Coordinates;
}

const CurrentLocationMarker: React.FC<Props> = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{ url: '/aboba.svg' }}
    />
  );
};

export { CurrentLocationMarker };
