import React from 'react';

import SelectChip from '../../../shared/SelectChip/SelectChip';

import './ComposeHeader.scoped.css';

function ComposeHeader ({ 
    handleClickSearchInput,
    isToggled,
    users,
    handleSelectUser,
    selectedUser,
    handleRemoveChip,
    handleOnChange,
    searchInputValue
}) {
    return (
        <div className="d-flex flex-column">
            <div className="row d-flex align-middle">
                <h3>New message</h3>
            </div>
            <div className="row d-flex align-middle">To: 
                <SelectChip 
                    placeholder={'somebody@example.com'}
                    customClass='search-input-compose'
                    handleClickSearchInput={handleClickSearchInput}
                    isToggled={isToggled}
                    users={users}
                    handleSelectUser={handleSelectUser}
                    selectedUser={selectedUser}
                    handleRemoveChip={handleRemoveChip}
                    handleOnChange={handleOnChange}
                    searchInputValue={searchInputValue}
                /> 
            </div>
        </div>
    )
}

export default ComposeHeader;
