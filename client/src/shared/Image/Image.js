import React from 'react';

import './Image.scoped.css';

function Image ({ source, width, customStyle, handleClick }) {
    return <img 
        src={source} 
        width={width}
        style={customStyle}
        onClick={handleClick}
        alt="avion slack clone"
    />
}

export default Image;
