import React from 'react';
import './App.css';
import Header from './containers/Header/Header';
import Content from './containers/Content/Content';

const App: React.FC = ()  => {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
