import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SearchInput from '../../shared/Search/SearchInput';
import SearchList from '../../shared/Search/SearchList';
import Input from '../../shared/Input/Input';
import List from '../../shared/List/List';

import ChannelApi from '../../api/ChannelApi';

import './CreateChannel.scoped.css';

function CreateChannel () {
    const [searched, setSearched] = useState('');
    const [results, setResults] = useState([]);
    const [channelName, setChannelName] = useState('');
    const [uidList, setUidList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const { 
        users
    } = useSelector(state => state.users);


    useEffect(() => {
        setResults(users);
     }, []);

     //handles Create Channel button. Triggers api create channel function passing in the channel name and chosen channel members. 
    const createChannel = async () => {
        if(channelName.trim()==='') {
            return alert('Must input a channel name');
        }
        else if(uidList.length < 1) {
            return alert('Please input users you want to include in your channel');
        }
        const payload = {
          'name': channelName,
          'user_ids': uidList
        };
        await ChannelApi.create(payload)
        .then(res => console.log(res))
        .catch(error => console.log(error.response.data.errors))
        setChannelName('');
        setUsersList([]);
        setUidList([]);
    }
    
    //gets the text value from search input
    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    //gets the value of channel name from the channel name text input
    const handleChannelNameChange = (e) => {
        setChannelName(e.target.value);
    }

    //handles choosing of channel members from our search list. 
    //adds the users onto usersList state and their ids to the uidList state which will be used for sending the info to slack api
    const handleClick = (item) => {
        if(!uidList.includes(item.id)) {
            setUsersList([...usersList, {id: item.id, image: item.image, email: item.email}]);
            setUidList([...uidList, item.id]);
            setResults(results.filter(result => result.id !== item.id));
            setSearched('');
        }
        else {
            alert('user was already added')
        }
    }   
    
    //handles remove item button. Removes the chosen user from the channel users to be included on create channel.
    const removeItem = (item) => {
        setUsersList(usersList.filter(user => user.email !== item.email));
    }

    return (
       <div className='full-content container-create-channel'>
           <div className = 'wrapper' >
           <div className='d-flex'>
                <Input 
                    placeholder='Enter Channel Name' 
                    type='text' 
                    handleChange={handleChannelNameChange}
                    customClass={'create-channel-input'}
                />
                <button onClick={createChannel}>Create Channel</button>
             </div>
            <SearchInput 
                searched={searched}
                readOnly={false}
                handleOnChange={handleOnChange}
                placeholder={'@somebody, or somebody@example.com'}
                customClass='search-input-create-channel'
            />
            {
                searched!==''  && 
                    <div className="wrapper-searchlist">
                        <div className="container-searchlist">
                            <SearchList 
                                results={results}
                                searched={searched}
                                customClass='create-channel-search'
                                handleClick={handleClick}
                                isNavLink={false}
                            />
                        </div>
                    </div>
            }
            <List list={usersList} removeItem={removeItem}/> 
            </div>
        </div>
    )
}

export default CreateChannel;
