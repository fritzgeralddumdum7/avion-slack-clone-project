import React from 'react';

import './PageHeader.scoped.css';

function PageHeader ({ 
    title, 
    buttonLabel, 
    handleButtonClick, 
    hasButton = true, 
}) {
    return (
        <div className='wrapper-fixed'>
            <header>
                <h3>{title}</h3>
                { hasButton &&
                    <button onClick={handleButtonClick}> {buttonLabel}</button>
                }
            </header>
        </div>    
    )
}

export default PageHeader;
