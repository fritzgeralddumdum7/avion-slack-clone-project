import React from 'react';

import './Divider.scoped.css';

function Divider ({ text }) {
    return (
        <div className="pill-container d-flex content-center"> 
            <div className="pill d-flex content-center"> { text } </div>
        </div>
    )
}

export default Divider;
