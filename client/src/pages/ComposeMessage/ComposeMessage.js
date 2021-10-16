import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextArea from '../../shared/TextArea/TextArea';
import Messages from '../../shared/Messages/Messages';
import ComposeHeader from './components/ComposeHeader';

import { isEmpty } from '../../utils';

import MessageApi from '../../api/MessageApi';

import { fetchConversation, emptyConversation } from '../../redux/messages';

import './ComposeMessage.scoped.css';

function ComposeMessage () {
    const { conversation } = useSelector(state => state.messages);
    const { users } = useSelector(state => state.users);

    const dispatch = useDispatch();

    const [isToggled, setIsToggled] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [messageText, setMessageText] = useState('');

    const handleClickSearchInput = () => {
        setIsToggled(!isToggled);
    }

    useEffect(() => {
        dispatch(emptyConversation());
    }, [dispatch])

    const handleSelectUser = (user) => {
        setIsToggled(!isToggled);
        setSelectedUser(user);
    }

    const handleRemoveChip = () => {
        setSelectedUser({});
        setFilteredUsers([]);
        dispatch(emptyConversation());
    }

    const handleOnChangeSearchInput = (e) => {
        setSearchInputValue(e.target.value)
    }

    useEffect(() => {
        if (Object.keys(selectedUser).length) {
            dispatch(fetchConversation({ type: 'User', id: selectedUser.id }));
        }
    }, [selectedUser, dispatch])

    useEffect(() => {
        // filter data that matches the search query
        let filtered = users.map(user => user.uid.toLowerCase().includes(searchInputValue.toLowerCase()) && user)

        // remove all undefined items
        filtered = filtered.filter(item => item);
        
        setFilteredUsers(filtered);
        filtered = [];
    }, [searchInputValue, users])

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (Object.keys(selectedUser).length > 0) {
            if (!isEmpty(messageText.trim())) {
                let payload = {
                    receiver_id: selectedUser.id,
                    receiver_class: 'User',
                    body: messageText
                }
    
                await MessageApi.send(payload)
                    .then(res => {
                        window.location = `../messages/${selectedUser.id}`
                    })
                    .catch(error => console.log(error.response.data.errors))
            }
        }
    }

    const handleOnChangeTextAreaValue = (e) => {
        setMessageText(e.target.value);
    }

    return (
        <div className="d-flex flex-column content">
            <ComposeHeader 
                handleClickSearchInput={handleClickSearchInput}
                isToggled={isToggled}
                users={filteredUsers}
                handleSelectUser={handleSelectUser}
                selectedUser={selectedUser}
                handleRemoveChip={handleRemoveChip}
                handleOnChange={handleOnChangeSearchInput}
                searchInputValue={searchInputValue}
            />
            <div className="message-container container full-content d-flex flex-column justify-bottom" style={{ gap: '20px' }}>
                <Messages 
                    messages={conversation}
                    selectedUser={selectedUser}
                />
                <TextArea
                    placeholder={Object.keys(selectedUser).length === 0 ? 'Start a new message' : `Message ${selectedUser.name}`}
                    handleOnChange={handleOnChangeTextAreaValue}
                    value={messageText}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default ComposeMessage;
