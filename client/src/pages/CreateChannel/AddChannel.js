import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';

import SearchList from '../../shared/Search/SearchList';
import Input from '../../shared/Input/Input';
import List from '../../shared/List/List';

import ChannelApi from '../../api/ChannelApi';

import './AddChannel.scoped.css';

function AddChannel ({closeAddChannel}) {
    const { users } = useSelector(state => state.users);
    
    const [searched, setSearched] = useState('');
    const [channelName, setChannelName] = useState('');
    const [results, setResults] = useState([]);
    const [uidList, setUidList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [nextClicked, setNextClicked] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setResults(users);
     }, [users]);

     // handles Create Channel button. Triggers api create channel function passing in the channel name and chosen channel members. 
    const createChannel = async () => {
        const payload = {
          'name': channelName,
          'user_ids': uidList
        };

        await ChannelApi.create(payload)
        .then(res => {
            // updates redux channel global state to update the user owned channel list on sidebar component
            if(res.data.errors) {
                setError(res.data.errors)
                setNextClicked(false);
            } else {
                window.location = `../channel/${res.data.data.id}`
            }
        })
        .catch(error => console.log(error.response.data.data.errors))
        setChannelName('');
        setUsersList([]);
        setUidList([]);
    }
    
    // gets the text value from search input
    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    // gets the value of channel name from the channel name text input
    const handleChannelNameChange = (e) => {
        setChannelName(e.target.value);
    }

    const handleNext = () => {
        if(!channelName.trim()) {
            setError('Must input a channel name');
        }
        else if(channelName.length < 4) {
            setError('Name too short (minimum of 4 characters)');
        }
        else {
            setNextClicked(true);
            setError(null);
        }
    }

    const handleBack = () => {
        setNextClicked(false);
    }

    // handles choosing of channel members from our search list. 
    // adds the users onto usersList state and their ids to the uidList state which will be used for sending the info to slack api
    const handleClick = (item) => {
        if(uidList.length < 10) {
            setUsersList([...usersList, {
                id: item.id, 
                image: 
                item.image, 
                email: 
                item.email
            }]);
            setUidList([...uidList, item.id]);
            setResults(results.filter(result => result.id !== item.id));
            setSearched('');
            setError(null);
        }
        else {
            setError('Maximum number of users reached')
            setSearched('');
        }
    }   

    //handles remove item button. Removes the chosen user from the channel users to be included on create channel.
    const removeItem = (item) => {
        setUsersList(usersList.filter(user => user.email !== item.email));
        setUidList(uidList.filter(uid => uid !== item.id));
    }

    const channelNameInput = () => {
        return (
            <div className='flex-column container-add-channel-name'>
                <div className = 'flex-column' >
                    <h2>Create a channel</h2>
                        <div className="flex-column wrapper-full-width">
                            <div className='wrapper-full-width'>
                                <Input 
                                    label="Name"
                                    value={channelName}
                                    placeholder='Enter Channel Name' 
                                    type='text' 
                                    maxLength={15}
                                    handleChange={handleChannelNameChange}
                                />
                                { error && <p>{error}</p>}
                            </div>
                            <div className='wrapper-button d-flex wrapper-full-width'>
                                <button onClick={handleNext}>Next</button>
                            </div>
                        </div>
                </div>
            </div>
        )
    }

    const addChannelMembers = () => {
        return (
            <div className='flex-column container-add-channel-members'>
                <div className = 'flex-column' >
                    <h2>Create a channel</h2>
                    <div className="flex-column wrapper-full-width">
                        <div className='wrapper-full-width wrapper-search-input'>
                            <Input
                                label='Search for users to add to channel - optional'
                                value={searched}
                                handleChange={handleOnChange}
                                placeholder={'@somebody, or somebody@example.com'}
                                customClass='search-input-create-channel'
                            />
                            { error && <p>{error}</p>}
                        </div>
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
                        <div className="wrapper-full-width container-list">
                            <List 
                                customClass={'add-channel-list'}
                                list={usersList} 
                                removeItem={removeItem}
                            /> 
                        </div>
                        <div className='wrapper-button d-flex wrapper-full-width'>
                            <button onClick={handleBack}>Back</button>
                            <button onClick={createChannel}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="wrapper-blackout-backdrop">
                <OutsideClickHandler onOutsideClick={closeAddChannel}>
                    {nextClicked ? addChannelMembers() : channelNameInput()}
                </OutsideClickHandler>
        </div>
                 
    )
}

export default AddChannel;
