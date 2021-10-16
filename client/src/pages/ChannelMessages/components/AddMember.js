import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../../../shared/Search/SearchInput';
import SearchList from '../../../shared/Search/SearchList';
import PageHeader from '../../../shared/PageHeader/PageHeader';
import List from '../../../shared/List/List';
import './AddMember.scoped.css';

function AddMember ({ 
    channelName, 
    handleAddUsers,
    usersNotOnChannel,
    setUsersNotOnChannel
}) { 
    const [searched, setSearched] = useState('');
    const [newUsersList, setNewUsersList] = useState([]);

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const handleClick = (item) => {
        setNewUsersList([...newUsersList, {id: item.id, image: item.image, email: item.email}]);
        setSearched('');
    }    

    const removeItem = (item) => {
        setNewUsersList(newUsersList.filter(newUser=> newUser.id !== item.id))
        setUsersNotOnChannel(previous => [...previous, item]);
    }

    return (
        <div className='container-add-member'>
            <PageHeader title={`${channelName} - Add Member` } hasButton={false}/>
            <div className='wrapper'>
                <div className="d-flex">
                    <BiSearch/>
                    <SearchInput 
                        placeholder={`Find Members to add to ${channelName}`}
                        customClass='members-list-search-input'
                        handleOnChange={handleOnChange}
                    />
                </div>
            </div>
                {
                searched!==''  && 
                    <div className="wrapper-searchlist">
                        <SearchList 
                            results={usersNotOnChannel}
                            searched={searched}
                            customClass='add-member-searchlist'
                            isNavLink={false}
                            handleClick={handleClick}
                            hasFooter={true}
                        />
                    </div>
                }
                <div className='wrapper-list'>
                    <List list={newUsersList} removeItem={removeItem}/> 
                </div>
                <div className="wrapper-button">
                    <button onClick={() => {
                            handleAddUsers(newUsersList) }}>
                                Add Users
                    </button>
                </div>
        </div>
        
    )
}

export default AddMember;
