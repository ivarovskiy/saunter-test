import * as React from 'react';
import { Search } from '../../components/Search';
import { PathList } from '../PathList';
import { observer } from 'mobx-react';
import './SideBar.scss';

const SideBar:React.FC = () => {
    return ( 
        <div className="sidebar">
            <Search />
            <PathList />
        </div>
    );
}

export default observer(SideBar);