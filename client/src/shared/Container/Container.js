import React from 'react';
import './Container.scoped.css';

function Container ({ children }) {
    return (
        <div className='d-flex flex-column container-wrapper'>
            { children }
        </div>
    )
}

export default Container;
