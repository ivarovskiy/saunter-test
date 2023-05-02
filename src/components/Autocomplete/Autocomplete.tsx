import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import './Autocomplete.scss';
import { Coordinates } from '../../models/Map';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

interface Props {
  isLoaded: boolean;
  onSelect: (coordinates: Coordinates) => void;
}

const Autocomplete: React.FC<Props> = ({ isLoaded, onSelect }) => {
  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: Suggestion) => () => {
    const { description } = suggestion;

    setValue(description, false);
    clearSuggestions();
    console.log(description);

    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      onSelect({ lat, lng });
    });
  };

  const renderSuggestions = () =>
    data.map((suggestion: Suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="list-item"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <FmdGoodOutlinedIcon />
          <div className="text">
            {secondary_text ? (
              <div>
                <span className="text--main">{main_text}, </span>
                <span className="text--secondary">{secondary_text}</span>
              </div>
            ) : (
              <span className="text--main">{main_text}</span>
            )}
          </div>
        </li>
      );
    });

  useEffect(() => {
    if (isLoaded) {
      init(); //когда кор библы загрузиться
    }
  }, [isLoaded, init]);

  return (
    <div ref={ref} className="autocomplete">
      <div>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={value}
            onChange={handleInput}
            disabled={!ready}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: '10px' }}
            aria-label="directions"
          >
            <ClearIcon />
          </IconButton>
        </Paper>
      </div>
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul className="suggestion">{renderSuggestions()}</ul>}
    </div>
  );
};

export { Autocomplete };
