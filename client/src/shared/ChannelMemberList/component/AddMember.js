import React, { useState, useEffect } from 'react';
import Faker from 'faker';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../../Search/SearchInput';
import SearchList from '../../Search/SearchList';
import UserApi from '../../../api/UserApi';
import ChannelApi from '../../../api/ChannelApi';
import PageHeader from '../../Header/PageHeader';
import List from '../../List/List';

import './AddMember.scoped.css';

function AddMember ({ 
    channelId, 
    channelName, 
    channelMembersIds,  
    setChannelMembersIds, 
    setAddMemberClicked, 
    channelMembers, 
    setChannelMembers, 
    getChannelMembers,
    allUsers,
    usersNotOnChannel,
    handleClick,
    toggleAddMember
}) { 
    // const [results, setResults] = useState([]);
    // const [searched, setSearched] = useState('');
    // const [uidList, setUidList] = useState([]);
    // const [usersList, setUsersList] = useState([]);

    // useEffect(() => {
    //     getAllUsers();
    //  }, []);

    // const getAllUsers = async () => {
    //     await UserApi.all()
    //       .then(res => handleUsers(res.data.data))
    //       .catch(error => console.log(error.response.errors))
    // }

    // const handleUsers = (array) => {
    //     array.map(item => {
    //         item.image=Faker.fake("{{image.avatar}}");
    //     });
    //     setResults(array.filter(user => !channelMembersIds.includes(user.id))); 
    // }

    // const addUserToChannel = async (userId) => {
    //     const payload = {
    //       "id": channelId,
    //       "member_id": userId
    //     }
    //     await ChannelApi.members(payload)
    //       .then(res => console.log(res))
    //       .catch(error => console.log(error))
    // }

    // const handleOnChange = (e) => {
    //     setSearched(e.target.value);
    // }

    // const handleClick = (item) => {
    //     if(!uidList.includes(item.id)) {
    //         setUsersList([...usersList, {id: item.id, image: item.image, email: item.email}]);
    //         setUidList([...uidList, item.id]);
    //         setResults(results.filter(result => result.id !== item.id));
    //         setSearched('');
    //     }
    //     else {
    //         alert('user was already added')
    //     }
    // }    

    // const handleAddUserButton = () => {
    //     setAddMemberClicked(false);
    //     uidList.forEach(uid => {
    //         addUserToChannel(uid);
    //     })
    //     setChannelMembers([...channelMembers, usersList]);
    //     // setChannelMembersIds([...channelMembersIds, uidList]);
    //     setResults([]);
    //     setUidList([]);
    //     setUsersList([]);
    //     getChannelMembers(channelId);
    // }

    // const removeItem = (item) => {
    //     setUsersList(usersList.filter(user => user.email !== item.email));
    // }

    return (
        <div className='container-add-member'>
            <PageHeader title={`${channelName} - Add Member` } hasButton={false}/>
            <div className="d-flex">
                <BiSearch/>
                <SearchInput 
                    placeholder='Find Members' 
                    customClass='members-list-search-input'
                />
            </div>
                {/* <SearchList 
                    results={usersNotOnChannel}
                    // searched={searched}
                    customClass='create-channel-search'
                    isNavLink={false}
                /> */}
                {/* {
                searched!==''  && 
                    <div className="wrapper-searchlist">
                        <div className="container-searchlist">
                            <SearchList 
                                results={results}
                                searched={searched}
                                customClass='create-channel-search'
                                isNavLink={false}
                            />
                        </div>
                    </div>
                } */}
                {/* <List list={usersList} />  */}
                <button onClick={() => {
                    handleClick('hehe')
                    toggleAddMember()
                }}>Add Users</button>
        </div>
        
    )
}

export default AddMember;
