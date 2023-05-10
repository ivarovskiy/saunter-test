import React, { useEffect } from 'react';
import './App.css';
import Header from './containers/Header/Header';
import Content from './containers/Content/Content';
import { observer } from 'mobx-react';
import FirebaseService from './services/firebase/firebaseService';
import store from './store/Store';

const firebaseService = new FirebaseService();

const App: React.FC = () => {
  
useEffect(() => {
  const getAllPaths = async () => {
    const paths = await firebaseService.getAllPaths();
    store.setPath(paths);
  };

  if (firebaseService != null && store != null) {
    getAllPaths();
  }
}, [firebaseService, store]);

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
};

export default observer(App);
