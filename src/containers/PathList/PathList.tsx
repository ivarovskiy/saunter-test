import React from 'react';
import Path from '../../components/Path/Path';
import { observer } from 'mobx-react';
import store from '../../store/Store';
import './PathList.scss';

const PathList:React.FC = () => {
  const { sortedPath, searchPath, query } = store;
  return (
    <div className="list">
      { query ? (
        searchPath.map((path) => (
          <ul className='path-list' key={path.id}>
            <Path path={path} />
          </ul>
        ))
      ) : (
        <div>
          {sortedPath.map((path) => (
            <ul className='path-list' key={path.id}>
              <Path path={path} />
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(PathList);
