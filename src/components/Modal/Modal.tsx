import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { observer } from 'mobx-react';
import ModalForm from './ModalForm';
import { Divider } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      maxWidth={'lg'}
      className="dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
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
