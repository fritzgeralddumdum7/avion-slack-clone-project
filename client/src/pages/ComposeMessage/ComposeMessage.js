import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';

import TextArea from '../../shared/TextArea/TextArea';
import Messages from '../../shared/Messages/Messages';
import ComposeHeader from './components/ComposeHeader';

import { alignMessagesWithUser, isEmpty } from '../../utils';

import MessageApi from '../../api/MessageApi';

import './ComposeMessage.scoped.css';

function ComposeMessage () {
    const { users } = useSelector(state => state.users);

    const [isToggled, setIsToggled] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [messageText, setMessageText] = useState('');

    const handleClickSearchInput = () => {
        setIsToggled(!isToggled);
    }

    const handleSelectUser = (user) => {
        setIsToggled(!isToggled);
        setSelectedUser(user);
    }

    const handleRemoveChip = () => {
        setSelectedUser({});
        setMessages([]);
        setFilteredUsers([]);
    }

    const handleOnChangeSearchInput = (e) => {
        setSearchInputValue(e.target.value)
    }

    useEffect(() => {
        if (Object.keys(selectedUser).length) {
            fetchConversation(selectedUser.id)
        }
    }, [selectedUser])

    const fetchConversation = async (receiverId) => {
        const fakeSender = {
            name: faker.fake("{{name.firstName}} {{name.lastName}}"),
            image: faker.fake("{{image.avatar}}")
        }
        const fakeReceiver = {
            name: faker.fake("{{name.firstName}} {{name.lastName}}"),
            image: faker.fake("{{image.avatar}}")
        }

        await MessageApi.retrieve('User', receiverId)
            .then(res => {
                const data = res.data.data;

                // loop every item and set fake name & image
                data.map(data => {
                    if (data['sender'].email === Cookies.get('uid')) {
                        data.name = fakeSender.name;
                        data.image = fakeSender.image;
                    } else {
                        data.name = fakeReceiver.name;
                        data.image = fakeReceiver.image;
                    }

                    return data;
                })
                setMessages(alignMessagesWithUser(data));
            })
            .catch(error => console.log(error.response.data.errors))
    }

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
                    messages={messages}
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
