import * as React from 'react';
import { Map, MODES } from '../../components/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete } from '../../components/Autocomplete';
import { useState, useCallback } from 'react';
import { Coordinates } from '../../models/Map';
import './Direction.scss';
import Button from '@mui/material/Button';
import RoomIcon from '@mui/icons-material/Room';

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const defaultCenter = {
  lat: 48.472754596279486,
  lng: 35.019543083840055,
};

const Direction: React.FC = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState<Coordinates[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-1',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates: Coordinates) => {
    setCenter(coordinates);
  }, []);

  const toogleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode);
  }, [mode]);

  const onMarkerAdd = useCallback(
    (coordinates: Coordinates) => {
      setMarkers([...markers, coordinates]);
    },
    [markers],
  );

  return (
    <div className="direction">
      <div className="address-search">
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <div className="btn">
          <Button
            variant="contained"
            startIcon={<RoomIcon />}
            onClick={toogleMode}
          >
            Add markers
          </Button>

        </div>
      </div>

      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <div className="select">Select any path</div>
      )}
    </div>
  );
};

export default Direction;
