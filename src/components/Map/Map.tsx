import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import { Coordinates, Mode } from '../../models/Map';
import { defaultTheme } from './Theme';
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import './Map.scss';
import { MyContext } from '../Modal/MyContext';
// import { Marker } from '../Marker';

const containerStyle: React.CSSProperties = {
  minWidth: '600px',
  minHeight: '600px',
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
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const { range, setRange } = useContext(MyContext);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc: google.maps.MapMouseEvent) => {
      if (mode === MODES.SET_MARKER) {
        const latLng = loc.latLng;
        if (latLng !== null) {
          const lat = latLng.lat();
          const lng = latLng.lng();
          onMarkerAdd({ lat, lng });
        }
      }
    },
    [mode, onMarkerAdd],
  );

  const handleDirectionsService = (
    response: google.maps.DirectionsResult | null,
  ) => {
    try {
      if (!response) {
        throw new Error('No response received');
      }

      const route = response.routes[0];

      let distance = 0;

      for (let i = 0; i < route.legs.length; i++) {
        const leg = route.legs[i];

        if (!leg.distance) {
          throw new Error('Distance not found for leg');
        }

        distance += leg.distance.value;
      }

      let range = '';

      if (distance > 1000) {
        range = `${distance / 1000} km`;
      } else {
        range = `${distance} m`;
      }

      setDirections(response);
      setRange(range);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (markers.length >= 2) {
      const directionsServiceOptions = {
        origin: {
          lat: markers[0].lat,
          lng: markers[0].lng,
        },
        destination: {
          lat: markers[markers.length - 1].lat,
          lng: markers[markers.length - 1].lng,
        },
        waypoints: markers.slice(1, markers.length - 1).map((marker) => ({
          location: {
            lat: marker.lat,
            lng: marker.lng,
          },
        })),
        travelMode: google.maps.TravelMode.DRIVING,
      };

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        directionsServiceOptions,
        handleDirectionsService,
      );
    }
  }, [markers]);

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
      >
        {/* <CurrentLocationMarker position={center} /> */}
        {markers.map((pos, index) => {
          return <Marker key={index} position={pos} />;
        })}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export { Map };
