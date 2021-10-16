import React from 'react'
import { NavLink } from 'react-router-dom';

import Image from '../../../shared/Image/Image';
import Button from '../../../shared/Button/Button';

import '../PageNotFound.scoped.css';

function Navbar () {
    const customStyle = {
        height: 34
    }

    return (
        <nav className="d-flex align-middle navbar">
            <Image 
                source='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg'
                customStyle={customStyle}
                width={100}
            />
            <div className="d-flex info">
                <Button text="Product" customClass="transparent-btn" />
                <Button text="Pricing" customClass="transparent-btn"/>
                <Button text="Support" customClass="transparent-btn" />
                <NavLink to='/compose' >
                    <Button text="Return to Avion Slack" customClass="transparent-btn outlined" />
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;
