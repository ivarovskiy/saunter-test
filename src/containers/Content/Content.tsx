import React from 'react';
import SideBar from '../SideBar/SideBar';
import Direction from '../Direction/Direction';
import './Content.scss';

const Content: React.FC = () => {

  return (
    <div className='content'>
      <SideBar />
      <Direction />
    </div>
  );
};

export default Content;
