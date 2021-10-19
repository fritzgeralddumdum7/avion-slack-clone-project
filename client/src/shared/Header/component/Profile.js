import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { FaRegUserCircle } from 'react-icons/fa';

import AuthApi from '../../../services/AuthApi';

import './Profile.scoped.css';

function Profile ({ image }) {
    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
        setIsToggled(!isToggled);
    }

    const handleLogout = () => {
        AuthApi.logout();
        window.location = '/';
    }

    return (
        <div className="d-flex flex-column profile-container">
            <FaRegUserCircle
                style={{width: '30px', height:'30px', color:'#fdffff', cursor:'pointer'}} 
                onClick={handleClick}
            />
            { isToggled &&
                <OutsideClickHandler onOutsideClick={handleClick}>
                    <div className="profile d-flex content-center" onClick={() => {
                        handleClick();
                        handleLogout();
                    }}>
                        Signout of Avion Slack
                    </div>
                </OutsideClickHandler>
            }
        </div>
    )
}

export default Profile;
