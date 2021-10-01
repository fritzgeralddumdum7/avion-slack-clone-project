import React from 'react';

function Image ({ source, width, customStyle }) {
    return <img 
        src={source} 
        width={width}
        style={customStyle}
    />
}

export default Image;
