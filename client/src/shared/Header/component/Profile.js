import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import Image from '../../Image/Image';

import AuthApi from '../../../services/AuthApi';

import './Profile.scoped.css';

function Profile ({ image }) {
    const [isToggled, setIsToggled] = useState(false);
    const styles = {
        borderRadius: '5px'
    }

    const handleClick = () => {
        setIsToggled(!isToggled);
    }

    const handleLogout = () => {
        AuthApi.logout();
        window.location = '/';
    }

    return (
        <div className="d-flex flex-column profile-container">
            <h4 style={{ color: 'white', cursor: 'pointer', paddingRight: '10px', paddingTop: '5px' }} onClick={handleClick}>Logout</h4>
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
