import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

import SearchInput from '../../../shared/Search/SearchInput';
import OutsideClickHandler from 'react-outside-click-handler';
import PageHeader from '../../../shared/PageHeader/PageHeader';
import SearchList from '../../../shared/SelectChip/components/SearchList';
import Image from '../../../shared/Image/Image';

import './AddMember.scoped.css';

function AddMember ({ 
    channelName, 
    handleAddUsers,
    usersNotOnChannel,
    handleReturnToMemberList,
    handleUserSelection,
    isClicked,
    toggleSearchList,
    selectedUsers,
    handleRemoveUser,
    searchedQuery,
    handleSearchQueryChange
}) { 
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // filter data that matches the search query
        let filtered = usersNotOnChannel.map(user => user.uid.toLowerCase().includes(searchedQuery.toLowerCase()) && user)

        // remove all undefined items
        filtered = filtered.filter(item => item);
        
        setFilteredUsers(filtered);
        filtered = [];
    }, [searchedQuery, usersNotOnChannel])

    const SelectedUser = ({ item, handleRemoveUser }) => {
        const styles = { borderRadius: '4px' }
        return (
            <div className="users-container align-middle" onClick={() => handleRemoveUser(item)}>
                <Image 
                    width={35}
                    customStyle={styles}
                    source={item.image}
                />
                <div className="flex-row">
                    <div className="user-info">
                        <label style={{fontWeight: 'bold'}}>{item.name}</label>
                        <small>{item.email}</small>
                    </div>
                    <small>
                        Remove
                    </small>
                </div>
            </div>
        )
    }

    return (
        <div className='container-add-member'>
            <PageHeader 
                title={`${channelName} - Add Member` } 
                buttonLabel='Return'
                handleButtonClick={handleReturnToMemberList}
            />
            <div className='wrapper'>
                <div className="d-flex input-wrapper">
                    <BiSearch/>
                    <SearchInput 
                        placeholder={`Find Members to add to ${channelName}`}
                        customClass='members-list-search-input'   
                        handleOnChange={handleSearchQueryChange}
                        handleClick={toggleSearchList}
                        searched={searchedQuery}
                    />
                        {
                            isClicked &&
                                <OutsideClickHandler onOutsideClick={() => toggleSearchList()}>
                                    <SearchList 
                                        users={filteredUsers}
                                        handleSelectUser={handleUserSelection}
                                    />
                                </OutsideClickHandler>
                        }
                </div>
            </div>
            <div style={{ height: '380px', overflow: 'auto', padding: '0 25px' }}>
                {
                    selectedUsers && selectedUsers.map((user, i) => 
                        <SelectedUser
                            key={i}
                            item={user}
                            handleRemoveUser={handleRemoveUser}
                        />
                    )
                }
            </div>
            <div className="wrapper-button">
                <button className={`add-new-member-btn ${!selectedUsers.length && 'disabled'}`} onClick={() => handleAddUsers(selectedUsers)}>
                    Add Users
                </button>
            </div>
        </div>
        
    )
}

export default AddMember;
