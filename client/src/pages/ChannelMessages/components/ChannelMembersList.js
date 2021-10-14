import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../../../shared/Search/SearchInput';
import SearchList from '../../../shared/Search/SearchList';
import PageHeader from './PageHeader';
import AddMember from './AddMember';

import './ChannelMemberList.scoped.css';

function ChannelMemberList ({ channelName, memberList, usersNotOnChannel, setUsersNotOnChannel, handleAddUsers, newUsersList }) { 
    const [searched, setSearched] = useState('');
    const [addMemberClicked, setAddMemberClicked] = useState(false);

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }
    
    const handleAddMemberButton = () => {
        setAddMemberClicked(true);
    }

    const closeAddMember = () => {
        setAddMemberClicked(false);
    }

    return (
        <div className='container-channel-members'> 
            <PageHeader title={channelName} buttonLabel='Add Member' handleButtonClick={handleAddMemberButton}/>
            <div className='wrapper'>
                <div className="d-flex">
                    <BiSearch/>
                    <SearchInput 
                        placeholder='Find Members' 
                        customClass='members-list-search-input'   
                        handleOnChange={handleOnChange}/>
                 </div>
            </div>
            <div className="container-searchlist">
                <SearchList 
                    results={memberList}
                    searched={searched}
                    setUsersNotOnChanne={setUsersNotOnChannel}
                    customClass='channel-member-searchlist'
                    isNavLink={false}
                />
            </div>
            {
                addMemberClicked && 
                <AddMember 
                    channelName={channelName}
                    usersNotOnChannel={usersNotOnChannel}
                    handleAddUsers={handleAddUsers}
                    closeAddMember={closeAddMember}
                />
            }
        </div>
    )
}

export default ChannelMemberList;
