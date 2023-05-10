import * as React from 'react';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Path.scss';
import { PathI } from '../../models/Path';
import { observer } from 'mobx-react';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { ContentContext } from '../../containers/Content/ContentContext';

interface Props {
  path: PathI;
}

const Path: React.FC<Props> = ({ path }) => {
  const { setValue } = useContext(ContentContext);

  const handleClick = () => {
    setValue(path.id);
  };

  return (
    <div className="path">
      <div className="path--desc">
        <div className="logo">
          <ZoomOutMapIcon />
        </div>
        <div className="path--content">
          <div className="title">
            {path.isFavorite ? (
              <div className="favorite">
                <StarIcon color="primary" />
              </div>
            ) : null}
            {path.title}
          </div>
          <div className="description">{path.shortDescription}</div>
        </div>
      </div>
      <div className="range">
        {path.range}
        <IconButton onClick={handleClick} className="arrow">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default observer(Path);
