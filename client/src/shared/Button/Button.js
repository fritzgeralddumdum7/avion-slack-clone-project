import React from 'react';
import './Button.scoped.css';

function Button ({ text, handleClick, disabled = false }) {
    return (
        <div>
            <button className={ disabled && 'loading' } disabled={disabled} onClick={handleClick}>{ text }</button>
        </div>
    )
}

export default Button;
