import { Dialog, DialogTitle, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { observer } from 'mobx-react';
// import Direction from '../../containers/Direction/Direction';
import ModalForm from './ModalForm';
// import { v4 as uuidv4 } from 'uuid';
import { Divider } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      className="dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      maxWidth={'lg'}
    >
      <DialogTitle id="modal-title">Add path</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Divider orientation="horizontal" />
      <ModalForm handleClose={handleClose} />
    </Dialog>
  );
};

export default observer(Modal);
