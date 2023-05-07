import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Coordinates, Mode } from '../../models/Map';
import './Map.scss';
import { ModalContext } from '../Modal/ModalContext';
import { defaultOptions, containerStyle } from './defaulOptions';
import { observer } from 'mobx-react';
import store from '../../store/Store';
import { toJS } from 'mobx';

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

interface Props {
  center: Coordinates;
  mode: Mode | number;
  markers: Coordinates[];
  onMarkerAdd: (coordinates: Coordinates) => void;
  pathById: string | undefined;
}

const Map: React.FC<Props> = ({
  center,
  mode,
  markers,
  onMarkerAdd,
  pathById,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const { range, setRange, marks, setMarks } = useContext(ModalContext);

  const [m, setM] = useState<Coordinates[]>([]);

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

      setMarks(markers);
      setDirections(response);
      setRange(range);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pathById) {
      const marks = store.getMarks(pathById);
      if (marks !== undefined) {
        markers = toJS(marks);
        setM(markers);
      }
    } else {
      setM(markers);
    }

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
  }, [markers, pathById]);

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
        {m.map((pos, index) => {
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

export default observer(Map);
