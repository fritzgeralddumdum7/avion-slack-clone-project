import React from 'react';
import './SearchInput.scoped.css';

function SearchInput({
    searchInputRef,
    searched,
    readOnly,
    handleOnChange,
    handleClick,
    placeholder,
    customClass
}) {
    return <input 
        ref={searchInputRef}
        value={searched}
        readOnly={readOnly}
        onChange={handleOnChange}
        onClick={handleClick}
        placeholder={placeholder}
        className={customClass}
    />
}

export default SearchInput;
