import React, { useState } from 'react';
import { SideBar } from '../SideBar';
import './Content.scss';
import { observer } from 'mobx-react';
import { Route }from '../../components/Route';
import { ContentContext, ContentContextType } from './ContentContext';
import store from '../../store/Store';

const Content: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const contextValue: ContentContextType = {
    value,
    setValue,
  };

  const pathById = store.pathById(value);

  return (
    <div className="content">
      <ContentContext.Provider value={contextValue}>
        <SideBar />
      </ContentContext.Provider>
      <Route pathById={pathById} />
    </div>
    
  );
};

export default observer(Content);
