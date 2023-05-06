import React from 'react';
import './App.css';
import Header from './containers/Header/Header';
import Content from './containers/Content/Content';
import { observer } from 'mobx-react';

const App: React.FC = ()  => {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default observer(App);
