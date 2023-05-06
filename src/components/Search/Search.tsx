import React, { useState } from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import './Search.scss';
import store from '../../store/Store';

// interface Props {
//   onSearch: (value: string) => void;
// }

const SearchInput: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // обработка отправки формы
  // }

  const handleSearch = () => {
    store.query = searchValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
      event.preventDefault();
    }
  };

  return (
    <div className="input">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 535,
          backgroundColor: 'var(--main-bg-color)',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search a path..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchInput;
