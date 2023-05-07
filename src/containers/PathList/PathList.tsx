import React from 'react';
import { Path } from '../../components/Path';
import { observer } from 'mobx-react';
import store from '../../store/Store';
import './PathList.scss';
import { v4 as uuidv4 } from 'uuid';

const PathList:React.FC = () => {
  const { sortedPath, searchPath, query } = store;
  return (
    <div className="list">
      { query ? (
        searchPath.map((path) => (
          <ul className='path-list' key={uuidv4()}>
            <Path path={path} key={uuidv4()}/>
          </ul>
        ))
      ) : (
        <div>
          {sortedPath.map((path) => (
            <ul className='path-list' key={uuidv4()}>
              <Path path={path} key={uuidv4()}/>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(PathList);
