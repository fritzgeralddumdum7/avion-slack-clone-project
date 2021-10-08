import React from 'react';
import './Button.scoped.css';

function Button ({ text, handleClick, disabled = false, customClass }) {
    return (
        <div>
            <button 
                className={`${customClass} ${disabled && 'loading'}`} 
                disabled={disabled} 
                onClick={handleClick}
            >
                { text }
            </button>
        </div>
    )
}

export default Button;
