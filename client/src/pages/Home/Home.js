import React, { useState } from 'react';
import Button from '../../shared/Button/Button';
import TextArea from '../../shared/TextArea/TextArea';
import authApi from '../../services/AuthApi'

import './Home.scoped.css';

const handleLogout = () => {
    authApi.logout();
    window.location = '/login';
}


function Home () {
    const [value, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className="container full-content">
            <div className="content">
                This is our home page
                <Button text='dummy Logout' handleClick={handleLogout} />
            </div>
            <TextArea
                placeholder='Send message...'
                handleOnChange={handleOnChange}
                value={value}
            />
        </div>
        
    )
}

export default Home;
