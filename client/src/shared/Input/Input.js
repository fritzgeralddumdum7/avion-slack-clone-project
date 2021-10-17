import React from 'react';

import './Input.scoped.css'

function Input ({ 
    children,
    placeholder, 
    value, 
    isValid, 
    type, 
    handleChange, 
    message,
    label,
    customClass,
    maxLength
}) {
    const setStyles = () => {
        if (isValid === false) {
            return 'red-border-line';
        }
    }

    const MessageText = () => {
        return <p>{ message }</p>;
    }

    const Label = () => {
        return <label>{ label }</label>;
    }

    return (
        <div>
            { label && <Label />}
            <div className={`input-wrapper ${customClass}`}>
                { children }
                <input
                    placeholder={placeholder}
                    value={value}
                    className={setStyles}
                    type={type}
                    onChange={handleChange}
                    maxLength={maxLength && maxLength}
                />
                { !isValid && <MessageText /> }
            </div>
        </div>
    )
}

export default Input;
