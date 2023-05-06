import * as React from 'react';
import { Marker as GoogleMapMarker } from '@react-google-maps/api';
import { Coordinates } from '../../models/Map';

interface Props {
  position: Coordinates;
}

const Marker: React.FC<Props> = ({ position }) => {
  return (
    <div className="marker">
      <GoogleMapMarker position={position} icon={{ url: './map-marker.svg' }} />
    </div>
  );
};

export { Marker };
