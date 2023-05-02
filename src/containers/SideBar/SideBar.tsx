import * as React from 'react';
import Search from '../../components/Search/Search';
import Path from '../../components/Path/Path';

const SideBar:React.FC = () => {
    return ( 
        <div className="sidebar">
            SideBar
            <Search />
            <Path />
        </div>
    );
}

export default SideBar;