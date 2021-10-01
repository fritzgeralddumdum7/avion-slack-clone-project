import React from 'react';
import './Disclaimer.scoped.css';

function Disclaimer ({ text }) {
    return (
        <div className="footer">
            <text>{ text }</text>
        </div>
    )
}

export default Disclaimer;
