import React from 'react';
import { BiTime } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';

import Search from './component/Search';
import Profile from './component/Profile';

import './Header.scoped.css';

function Header ({ image }) {

    return (
        <div className="d-flex" style={{ backgroundColor: '#350D36' }}>
            <header>
                <BiTime className = 'bi-history-icon' />
                <Search />
                <FiHelpCircle className="help-icon" />
            </header>
            <div style={{ marginRight: '10px' }}>
                <Profile image={image} />
            </div>
        </div>
    )
}

export default Header;
