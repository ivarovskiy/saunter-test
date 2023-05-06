import { Grid, TextField, Box } from '@mui/material';
import * as React from 'react';
import { Form, useForm } from './useForm';
import Direction from '../../containers/Direction/Direction';
import Button from '@mui/material/Button';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import './Modal.scss';
import { styled } from '@mui/material/styles';
import { MyContext, MyContextType } from './MyContext';
import { useState } from 'react';

const Item = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const initialValues = {
  id: 0,
  title: '',
  shortDescription: '',
  fullDescription: '',
  range: '',
  isFavorite: false,
};

interface Props {
  handleClose: () => void;
}

const ModalForm: React.FC<Props> = ({ handleClose }) => {
  const [range, setRange] = useState('');
  const contextValue: MyContextType = {
    range,
    setRange,
  };

  const { values, setValues, handleInputChange, handleSave } = useForm(
    initialValues,
    handleClose,
    range,
  );

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Item
              fullWidth
              variant="outlined"
              label="Title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              className="text-field"
              autoComplete="off"
            />
            <Item
              fullWidth
              variant="outlined"
              label="Short Description"
              name="shortDescription"
              value={values.shortDescription}
              onChange={handleInputChange}
              autoComplete="off"
              inputProps={{ maxLength: 160 }}
              multiline={true}
            />
            <div className="limit">
              Limit {values.shortDescription.length} of 160
            </div>
            <Item
              fullWidth
              variant="outlined"
              label="Full Description"
              name="fullDescription"
              value={values.fullDescription}
              onChange={handleInputChange}
              autoComplete="off"
              multiline
              rows={4}
              size="medium"
            />
            <Item
              fullWidth
              variant="outlined"
              label="Range"
              name="range"
              value={range}
              disabled
              size="medium"
            />
            <div>
              <Button
                disabled
                variant="outlined"
                endIcon={<AddLocationIcon />}
                onClick={handleSave}
                sx={{
                  width: '100%',
                  margin: (theme) => theme.spacing(1),
                }}
              >
                Add path
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={8} className="dialog">
          <MyContext.Provider value={contextValue}>
            <Direction />
          </MyContext.Provider>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ModalForm;
