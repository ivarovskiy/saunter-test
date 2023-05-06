import * as React from 'react';
import './Route.scss';
import Direction from '../../containers/Direction/Direction';
import { PathI } from '../../models/Path';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ButtonGroup } from '@mui/material';

interface Props {
  pathById: PathI | undefined;
}

const Route: React.FC<Props> = ({ pathById }) => {
  const handleFavorite = () => {
    console.log('add to favorite');
  };

  const handleRemoveFromFavorite = () => {
    console.log('remove from favorite');
  };

  const handleDelete = () => {
    console.log('remove path');
  };
  return (
    <>
      {pathById ? (
        <div className="route">
          <div className="route--header">
            <div className="title">
                {pathById.title}
            </div>
            <div className="range">
                {pathById.range}
            </div>
          </div>
          <div className="route--body">
            <div className="full-description">
                {pathById.fullDescription}
            </div>
            <div className="map">
                <Direction />
            </div>
          </div>
          <div className="route--footer">
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              color="error"
            >
              <Button color="error" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              {pathById.isFavorite ? (
                <Button color="error" endIcon={<StarBorderIcon />}>
                  Remove from favorite
                </Button>
              ) : (
                <Button color="primary" endIcon={<StarIcon />}>
                  Add to favorite
                </Button>
              )}
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className="container">Select any path</div>
      )}
    </>
  );
};

export default Route;
