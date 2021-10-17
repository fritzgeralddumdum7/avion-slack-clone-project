import React from 'react';
import { VscClose } from 'react-icons/vsc';
import OutsideClickHandler from 'react-outside-click-handler';

import SearchInput from '../Search/SearchInput';
import SearchList from './components/SearchList';
import Image from '../Image/Image';

import './SelectChip.scoped.css';

function SelectChip ({ 
    users,
    placeholder, 
    customClass, 
    handleClickSearchInput,
    isToggled,
    handleSelectUser,
    selectedUser,
    handleRemoveChip,
    handleOnChange,
    searchInputValue
}) {
    const styles = {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px'
    }
    const UserChip = ({ email, image, handleRemoveChip }) => {
        return (
            <div className="chip d-flex align-middle">
                <Image 
                    width={25}
                    source={image}
                    customStyle={styles}
                />
                <label>{ email }</label>
                <VscClose className="remove-chip" onClick={() => handleRemoveChip()} />
            </div>
        )
    }

    return (
        <div className="select-chip">
            <div className="search-wrapper">
                {
                    Object.keys(selectedUser).length ? 
                        <UserChip 
                            email={selectedUser.email}
                            image={selectedUser.image}
                            handleRemoveChip={handleRemoveChip}
                        /> :
                        <div>
                            <SearchInput 
                                placeholder={placeholder}
                                customClass={customClass}
                                handleClick={handleClickSearchInput}
                                handleOnChange={handleOnChange}
                            />
                            {
                                isToggled &&
                                <OutsideClickHandler onOutsideClick={() => handleClickSearchInput()}>
                                    <SearchList 
                                        users={users}
                                        handleSelectUser={handleSelectUser}
                                    />
                                </OutsideClickHandler>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default SelectChip;
