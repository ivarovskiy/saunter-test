import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import './Content.scss';
import { observer } from 'mobx-react';
import Route from '../../components/Route/Route';
import { Divider } from '@mui/material';
import { MyContext, MyContextType } from './MyContext';
import store from '../../store/Store';

const Content: React.FC = () => {
  const [value, setValue] = useState<number>(-1);

  const contextValue: MyContextType = {
    value,
    setValue,
  };

  const pathById = store.pathById(value);

  return (
    <div className="content">
      <MyContext.Provider value={contextValue}>
        <SideBar />
      </MyContext.Provider>

      <Divider sx={{ height: 850, m: 0.5 }} orientation="vertical" />
      <Route pathById={pathById} />
    </div>
  );
};

export default observer(Content);
