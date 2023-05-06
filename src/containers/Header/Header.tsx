import * as React from 'react';
import './Header.scss';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Button from '@mui/material/Button';
import Modal from '../../components/Modal/Modal';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="name--container">
        <div className="logo">
          <ZoomOutMapIcon />
        </div>
        <div className="name">Saunter</div>
      </div>
      <div className="button">
        <Button variant="contained" onClick={handleClickOpen}>Add path</Button>
        <Modal open={open} handleClose={handleClose}/>
      </div>
    </div>
  );
};

export default Header;
