import React, { useState, useEffect } from 'react';
import Faker from 'faker';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../Search/SearchInput';
import SearchList from '../Search/SearchList';
import ChannelApi from '../../api/ChannelApi';
import UserApi from '../../api/UserApi';
import List from '../List/List';
import PageHeader from '../Header/PageHeader';
import AddMember from './component/AddMember';

import './ChannelMemberList.scoped.css';

function ChannelMemberList ({ channelId, channelName }) { 
    const [channelMembers, setChannelMembers] = useState([]);
    const [channelMembersIds, setChannelMembersIds] = useState([]);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState('');
    const [addMemberClicked, setAddMemberClicked] = useState(false);
    
    useEffect(() => {
        getChannelMembers(channelId);
     }, []);

    const getChannelMembers = async(channelId) => {
        const memberIds = await ChannelApi.details(channelId)
        .then(res => {
            const data = res.data.data.channel_members;
            let array = data.map(item => {
                return item.user_id;
            })
            return array;
        })
        .catch(error => console.log(error.response.data.errors));
        await UserApi.all()
            .then(res => {
                const data=res.data.data;
                const membersList = data.filter(item => memberIds.includes(item.id));
                handleUsers(membersList);
                setResults(membersList);
            })
            .catch(error => console.log(error.response.data.errors));
    }   

    const handleUsers = (array) => {
        array.map(item => {
            item.image=Faker.fake("{{image.avatar}}");
        });
        setChannelMembersIds(array.map(item => {
            return item.id
        }));
         setChannelMembers(array); 
    }

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const handleClick = (item) => {
    }
    
    const handleAddMemberButton = () => {
        setAddMemberClicked(true);
    }

    return (
        <div className='container-channel-members'> 
            <PageHeader title={channelName} buttonLabel='Add Member' handleButtonClick={handleAddMemberButton}/>
            <div className="d-flex">
                <BiSearch/>
                <SearchInput 
                    placeholder='Find Members' 
                    customClass='members-list-search-input'   
                    handleOnChange={handleOnChange}/>
            </div>
            {
                searched !== '' ?
                    <div className="container-searchlist">
                        <SearchList 
                            results={results}
                            searched={searched}
                            customClass='channel-member-searchlist'
                            handleClick={handleClick}
                            isNavLink={false}
                            handleClick={handleClick}
                        />
                    </div>
                :
                <List list={channelMembers} channelName={channelName} customClass='channel-member-list'/>    
            } 
            {
                addMemberClicked && 
                <AddMember 
                    channelId={channelId} 
                    channelMembersIds={channelMembersIds} 
                    setChannelMembersIds={setChannelMembersIds}
                    setAddMemberClicked={setAddMemberClicked}
                    getChannelMembers={getChannelMembers}
                    channelMembers={channelMembers}
                    setChannelMembers={setChannelMembers}
                />
            }
        </div>
    )
}

export default ChannelMemberList;
