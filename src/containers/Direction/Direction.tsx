import * as React from 'react';
import { Map } from '../../components/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete } from '../../components/Autocomplete';
import { useState, useCallback, useEffect } from 'react';
import { Coordinates, Mode } from '../../models/Map';
import './Direction.scss';
import { getBrowserLocation, defaultCenter } from '../../utils/geo';
import { observer } from 'mobx-react';

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

interface Props {
  isRoute: boolean;
  pathById: string | undefined;
  mode: Mode | number;
}

const Direction: React.FC<Props> = ({ isRoute, pathById, mode }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState<Coordinates[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-1',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates: Coordinates) => {
    setCenter(coordinates);
  }, []);

  const onMarkerAdd = useCallback(
    (coordinates: Coordinates) => {
      setMarkers([...markers, coordinates]);
    },
    [markers],
  );

  useEffect(() => {
    getBrowserLocation()
      .then((curLoc: any) => {
        setCenter(curLoc);
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <div className="direction">
      {isLoaded && isRoute && (
        <div className="address-search">
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        </div>
      )}
      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
          pathById={pathById}
        />
      ) : (
        <div className="select">Select any path</div>
      )}
    </div>
  );
};

export default observer(Direction);
