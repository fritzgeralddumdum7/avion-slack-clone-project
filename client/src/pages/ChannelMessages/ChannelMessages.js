import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import OutsideClickHandler from 'react-outside-click-handler';

import { alignMessagesWithUser, isEmpty, serializer } from '../../utils';

import TextArea from '../../shared/TextArea/TextArea';
import Messages from '../../shared/Messages/Messages';
import PageHeader from './components/PageHeader';
import ChannelMemberList from './components/ChannelMembersList';

import MessageApi from '../../api/MessageApi';
import ChannelApi from '../../api/ChannelApi';

function ChannelMessages () {
    const { channelId } = useParams();
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [showMemberList, setShowMemberList] = useState(false);
    //memberList returns object info of channel members 
    const [memberList, setMemberList] = useState([]);
    //usersNotOnChannel returns info of users not a member of the current channel selected
    const [usersNotOnChannel, setUsersNotOnChannel] = useState([]);
    const [channelName, setChannelName] = useState('');
    
    const socket = useRef();
    const currentUser = useRef({
        uid: Cookies.get('uid'),
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        image: faker.fake("{{image.avatar}}")
    });
    
    const { 
        users
    } = useSelector(state => state.users);

    useEffect(async () => {
        setMemberList([]);
        await fetchChannelMessages();
        await fetchChannelInfo();
    }, [channelId])

    useEffect(() => {
        socket.current = io(`http://localhost:${process.env.REACT_APP_SOCKET_PORT}`);
        // get the `getMessage` response from socket
        socket.current.on('getMessage', payload => {
            setArrivalMessage(payload);
        })
    }, [])

    // prevent rerender of component
    useEffect(() => {
        if (arrivalMessage && (arrivalMessage.type === 'channel' && channelId === arrivalMessage.roomId)) {
            setMessages(prev => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage])

    const fetchChannelInfo = async () => {
        await ChannelApi.details(channelId)
            .then(res => {
                setUserInfoOnMemberList(res.data.data.channel_members);
                setNonMembersInfo(res.data.data.channel_members);
                setChannelName(res.data.data.name)
            })
            .catch(error => console.log(error.response.data.errors))
    }

    const addMemberToChannel = async (newUserId) => {
        const payload = {
          "id": channelId,
          "member_id": newUserId
        }
    
        await ChannelApi.members(payload)
          .then()
          .catch(error => console.log(error))
    }
    
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (!isEmpty(value.trim())) {
            const payload = {
                roomId: channelId,
                name: currentUser.current.name,
                image: currentUser.current.image,
                body: [value],
                type: 'channel'
            }
            const messagePayload = {
                receiver_id: channelId,
                receiver_class: 'Channel',
                body: value
            }
            socket.current.emit('sendMessage', { payload });
            setValue('');

            MessageApi.send(messagePayload)
                .then()
                .catch(error => console.log(error.response.data.errors))
        }
    }

    const fetchChannelMessages = async () => {
        const fakeSender = {
            name: faker.fake("{{name.firstName}} {{name.lastName}}"),
            image: faker.fake("{{image.avatar}}")
        }
        const fakeReceiver = {
            name: faker.fake("{{name.firstName}} {{name.lastName}}"),
            image: faker.fake("{{image.avatar}}")
        }
        
        await MessageApi.retrieve('Channel', channelId)
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
                })
                setMessages(alignMessagesWithUser(data));
            })
            .catch(err => console.log(err))
    }

    const handleShowMemberListModal = () => {
        setShowMemberList(!showMemberList);
    }

    //gets the info of channelMembers from users and stores it on memberList useState.
    const setUserInfoOnMemberList = (channelMembers) => {
        channelMembers.forEach(member => {
            const user = users.find(user => user.id === member.user_id)
            setMemberList(previous => [...previous, user]);
        })
    }

    //gets the info of users not yet a member of the channel and stores it on usersNotOnChannel useState.
    const setNonMembersInfo = (channelMembers) => {
        let memberIds = []
        channelMembers.forEach(member => {
                memberIds.push(member.user_id)
        })
        users.forEach(user => {
            if (!memberIds.includes(user.id)) {
                setUsersNotOnChannel(previous => [...previous, user])
            }
        })
    }

    //called on AddMember; Handles Add User Button on AddMember.
    const handleAddUsers = (newMembers) => {
        newMembers.forEach(member => {
            addMemberToChannel(member.id)
            setMemberList(previous => [...previous, member]);
        })
        let array = newMembers.map(member => {
            return member.id
        })
        setUsersNotOnChannel(usersNotOnChannel.filter(user => !array.includes(user.id)));
        handleShowMemberListModal();
    }

    return (
        <div className="container full-content d-flex flex-column">
            <PageHeader 
                title={channelName} 
                buttonLabel='Members'  
                handleButtonClick={handleShowMemberListModal}
            />
             { 
                showMemberList && 
                <OutsideClickHandler onOutsideClick={handleShowMemberListModal}>
                    <ChannelMemberList 
                        channelName='Test Name'
                        memberList={memberList}
                        usersNotOnChannel={usersNotOnChannel}
                        setUsersNotOnChannel={setUsersNotOnChannel}
                        handleAddUsers={handleAddUsers}
                        handleShowMemberListModal={handleShowMemberListModal}
                    />
                 </OutsideClickHandler>
            }
            <div className='message-container d-flex flex-column' style={{paddingBottom: '0px', paddingLeft: '0px' }}>
                <Messages messages={messages} />
                <TextArea
                    placeholder={`Send your message here...`}
                    handleOnChange={handleOnChange}
                    value={value}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default ChannelMessages;
