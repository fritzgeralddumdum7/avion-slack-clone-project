import React, { useRef, useEffect, useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';

import './TextArea.scoped.css';

function TextArea ({ 
    placeholder, 
    handleOnChange, 
    value,
    handleSendMessage
}) {
    const textareaRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        // const scrollHeight = computeTextHeight(50);
        const scrollHeight = computeTextHeight(10);
        textareaRef.current.style.overflow = scrollHeight > window.innerHeight / 2 ? 'auto' : 'hidden';
    }, [value])

    const handleFocus = () => {
        computeTextHeight(10)
        setIsFocused(true);
    }

    const handleBlur = () => {
        computeTextHeight(9);
        setIsFocused(false);
    }

    const computeTextHeight = (deduct) => {
        textareaRef.current.style.height = `${deduct}px`;
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight - deduct}px`;

        return scrollHeight;
    }

    return (
        <div className="textarea-container">
            <textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div id="send-container" className={ isFocused ? 'focus' : '' }>
                <button 
                    onClick={handleSendMessage}
                    className={!value && 'is-empty'}
                >
                    <RiSendPlane2Fill />
                </button>
            </div>
        </div>
    )
}

export default TextArea;
