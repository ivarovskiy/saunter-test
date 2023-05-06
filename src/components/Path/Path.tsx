import * as React from 'react';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Path.scss';
import { PathI } from '../../models/Path';
import { observer } from 'mobx-react';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { MyContext } from '../../containers/Content/MyContext';

interface Props {
  path: PathI;
}

const Path: React.FC<Props> = ({ path }) => {
  const { value, setValue } = useContext(MyContext);

  const handleClick = () => {
    console.log('pathId', path.id);
    setValue(path.id);
  };

  return (
    <div className="path">
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
      <div className="range">{path.range}</div>
      <IconButton onClick={handleClick}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default observer(Path);
