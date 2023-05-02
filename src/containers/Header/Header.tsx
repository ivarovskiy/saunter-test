import * as React from 'react';
import './Header.scss';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Button from '@mui/material/Button';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="name--container">
        <div className="logo">
          <ZoomOutMapIcon />
        </div>
        <div className="name">Saunter</div>
      </div>
      <div className="button">
        <Button variant="contained">Add path</Button>
      </div>
    </div>
  );
};

export default Header;
