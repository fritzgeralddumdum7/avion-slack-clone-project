import React from 'react';
import './Footer.scoped.css';

function Footer ({ text }) {
    return (
        <div className="footer">
            <text>{ text }</text>
        </div>
    )
}

export default Footer;
