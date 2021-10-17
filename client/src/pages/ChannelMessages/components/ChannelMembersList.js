import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../../../shared/Search/SearchInput';
import SearchList from '../../../shared/Search/SearchList';
import PageHeader from '../../../shared/PageHeader/PageHeader';
import AddMember from './AddMember';

import './ChannelMemberList.scoped.css';

function ChannelMemberList ({ 
    channelName, 
    memberList, 
    usersNotOnChannel, 
    handleAddUsers, 
    handleUserSelection,
    isClicked,
    toggleSearchList,
    selectedUsers,
    handleRemoveUser,
    handleSearchQueryChange,
    searchedQuery
}) { 
    const [searched, setSearched] = useState('');
    const [addMemberClicked, setAddMemberClicked] = useState(false);

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }
    
    const toggleAddMember = () => {
        setAddMemberClicked(!addMemberClicked);
    }

    return (
        <div className='container-channel-members'> 
            <div className='fixed-top'>
                <PageHeader 
                    title={channelName} 
                    buttonLabel='Add Member' 
                    handleButtonClick={toggleAddMember}
                />
                <div className='wrapper'>
                    <div className="d-flex input-wrapper">
                        <BiSearch/>
                        <SearchInput 
                            placeholder={`Find Members in ${channelName}`}
                            customClass='members-list-search-input'   
                            handleOnChange={handleOnChange}/>
                    </div>
                </div>
                <div style={{ height: '415px', overflow: 'auto' }}>
                    <SearchList 
                        results={memberList}
                        searched={searched}
                        customClass='channel-member-searchlist'
                    />
                </div>
            </div>
            {
                addMemberClicked && 
                <AddMember 
                    channelName={channelName}
                    usersNotOnChannel={usersNotOnChannel}
                    handleAddUsers={handleAddUsers}
                    handleReturnToMemberList={toggleAddMember}
                    handleUserSelection={handleUserSelection}
                    isClicked={isClicked}
                    toggleSearchList={toggleSearchList}
                    selectedUsers={selectedUsers}
                    handleRemoveUser={handleRemoveUser}
                    searchedQuery={searchedQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                />
            }
        </div>
    )
}

export default ChannelMemberList;
