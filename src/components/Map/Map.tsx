import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Coordinates, Mode } from '../../models/Map';
import { defaultTheme } from './Theme';
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import './Map.scss';
import { Marker } from '../Marker';

const containerStyle: React.CSSProperties = {
  width: '700px',
  height: '700px',
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scroolwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: defaultTheme,
};

interface Props {
  center: Coordinates;
  mode: Mode | number;
  markers: Coordinates[];
  onMarkerAdd: (coordinates: Coordinates) => void;
}

const Map: React.FC<Props> = ({ center, mode, markers, onMarkerAdd }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc: google.maps.MapMouseEvent) => {
      // исправить
      if (mode === MODES.SET_MARKER) {
        const latLng = loc.latLng;
        if (latLng !== null) {
          const lat = latLng.lat();
          const lng = latLng.lng();
          onMarkerAdd({ lat, lng });
          console.log({ lat, lng });
        }
      }
    },
    [mode, onMarkerAdd],
  );

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
        // так же можно впихнуть онклик
      >
        <Marker position={center} />
        <CurrentLocationMarker position={center} />
        {markers.map((pos) => {
          return <Marker position={pos} />;
        })}
      </GoogleMap>
    </div>
  );
};

export { Map };
