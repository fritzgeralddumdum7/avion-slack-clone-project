import React from 'react';
import './Button.scoped.css';

function Button ({ text, handleClick }) {
    return (
        <div>
            <button onClick={handleClick}>{ text }</button>
        </div>
    )
}

export default Button;
