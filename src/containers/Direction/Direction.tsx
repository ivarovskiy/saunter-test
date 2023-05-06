import * as React from 'react';
import { Map, MODES } from '../../components/Map';
import { useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { Autocomplete } from '../../components/Autocomplete';
import { useState, useCallback, useEffect } from 'react';
import { Coordinates } from '../../models/Map';
import './Direction.scss';
import Button from '@mui/material/Button';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { getBrowserLocation, defaultCenter } from '../../utils/geo';

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

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

  const clear = useCallback(() => {
    setMarkers([]);
  }, []);

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
      <div className="address-search">
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <div className="button--group">
          <Button
            className="add"
            variant="contained"
            startIcon={<AddLocationAltIcon />}
            onClick={toogleMode}
          >
            Add markers
          </Button>
          {markers.length > 0 && (
            <Button
              className="clear"
              variant="contained"
              startIcon={<FmdBadIcon />}
              onClick={clear}
            >
              Clear
            </Button>
          )}
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
