import * as React from 'react';
import './Route.scss';
import Direction from '../../containers/Direction/Direction';
import { PathI } from '../../models/Path';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ButtonGroup } from '@mui/material';
import store from '../../store/Store';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

interface Props {
  pathById: PathI | undefined;
}

const Route: React.FC<Props> = ({ pathById }) => {
  const handleFavorite = (isFavorite: boolean) => {
    if (pathById) {
      store.isFavorite(pathById.id, isFavorite);
    }
  };

  const handleDelete = () => {
    if (pathById) {
      store.removeFromPath(pathById.id);
      console.log('deleted');
    }
  };

  return (
    <>
      {pathById ? (
        <div className="route">
          <div className="route--header">
            <div className="title">{pathById.title}</div>
            <div className="range">{pathById.range}</div>
          </div>
          <div className="route--body">
            <div className="full-description">{pathById.fullDescription}</div>
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
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
              {pathById.isFavorite ? (
                <Button
                  color="error"
                  endIcon={<StarBorderIcon />}
                  onClick={() => handleFavorite(true)}
                >
                  Remove from favorite
                </Button>
              ) : (
                <Button
                  color="primary"
                  endIcon={<StarIcon />}
                  onClick={() => handleFavorite(false)}
                >
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

export default observer(Route);
