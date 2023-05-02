import React from 'react';
import { IconButton, InputBase, makeStyles } from '@mui/material';
import { Search } from '@mui/icons-material';

// interface Props {
//   onSearch: (value: string) => void;
// }

const SearchInput: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = () => {
    console.log(searchValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <InputBase
        placeholder="Select a path..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <IconButton onClick={handleSearch}>
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchInput;
