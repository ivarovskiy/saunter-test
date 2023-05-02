import * as React from 'react';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Path.scss';

const Path: React.FC = () => {
  const path = {
    title: 'Path title',
    description: 'Short description...',
    range: '1,75',
  };
  return (
    <div className="path">
      <div className="logo">
        <ZoomOutMapIcon />
      </div>
      <div className="path--content">
        <div className="title">
          {path.title}
        </div>
        <div className="description">
          {path.description}
        </div>
      </div>
      <div className="range">
        {path.range}
      </div>
      <div className="arrow">
        <ArrowForwardIosIcon fontSize="small" />
      </div>
    </div>
  );
};

export default Path;
