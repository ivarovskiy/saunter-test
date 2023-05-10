import { Grid, TextField, Box } from '@mui/material';
import * as React from 'react';
import { Form, useForm } from './useForm';
import { Direction } from '../../containers/Direction';
import Button from '@mui/material/Button';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import './Modal.scss';
import { styled } from '@mui/material/styles';
import { ModalContext, ModalContextType } from './ModalContext';
import { useCallback, useState } from 'react';
import { Coordinates } from '../../models/Map';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { MODES } from '../../components/Map';
import PanToolIcon from '@mui/icons-material/PanTool';

const CustomGrid = styled(Grid)(() => ({
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const CustomBox = styled(Box)(() => ({
  '@media (max-width: 768px)': {
    margin: 0,
    width: '280px',
  },
}));

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
  const [mode, setMode] = useState(MODES.MOVE);
  const [range, setRange] = useState('');
  const [marks, setMarks] = useState<Coordinates[]>([]);

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
  }, [mode]);

  const contextValue: ModalContextType = {
    range,
    setRange,
    marks,
    setMarks,
  };

  const { values, handleInputChange, handleSave } = useForm(
    initialValues,
    handleClose,
    range,
    marks,
  );

  const validateForm = () => {
    const { title, shortDescription, fullDescription } = values;

    if (
      title === '' ||
      shortDescription === '' ||
      fullDescription === '' ||
      range === ''
    ) {
      return false;
    }
    return true;
  };

  return (
    <Form>
      <CustomGrid container spacing={2}>
        <Grid item xs={4}>
          <CustomBox
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
              rows={5}
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
                disabled={!validateForm()}
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
              <div className="add-button">
                {mode === MODES.MOVE ? (
                  <Button
                    className="add"
                    variant="outlined"
                    startIcon={<AddLocationAltIcon />}
                    onClick={toogleMode}
                  >
                    Add markers
                  </Button>
                ) : (
                  <Button
                    className="move"
                    variant="outlined"
                    startIcon={<PanToolIcon />}
                    onClick={toogleMode}
                  >
                    Move Map
                  </Button>
                )}
              </div>
            </div>
          </CustomBox>
        </Grid>
        <Grid item xs={8} className="dialog">
          <ModalContext.Provider value={contextValue}>
            <Direction isRoute={true} pathById={undefined} mode={mode} />
          </ModalContext.Provider>
        </Grid>
      </CustomGrid>
    </Form>
  );
};

export default ModalForm;
