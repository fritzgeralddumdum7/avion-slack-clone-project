import React, { 
    useEffect, 
    useState, 
    useRef 
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

import OutsideClickHandler from 'react-outside-click-handler';
import ChannelMemberList from './components/ChannelMembersList';

import Messages from '../../shared/Messages/Messages';
import TextArea from '../../shared/TextArea/TextArea';
import PageHeader from '../../shared/PageHeader/PageHeader';

import { 
    fetchConversation,
    setConversation
} from '../../redux/messages';

import { 
    fetchChannelInfo,
} from '../../redux/channels';

import { isEmpty } from '../../utils';

import MessageApi from '../../api/MessageApi';
import ChannelApi from '../../api/ChannelApi';

function ChannelMessages () {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { conversation, sender } = useSelector(state => state.messages);
    const { users } = useSelector(state => state.users);
    const { channelInfo } = useSelector(state => state.channels);

    const [value, setValue] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [showMemberList, setShowMemberList] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [memberList, setMemberList] = useState([]);
    const [usersNotOnChannel, setUsersNotOnChannel] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchedQuery, setSearchedQuery] = useState('');

    const socket = useRef();

    useEffect(() => {
        dispatch(fetchConversation({ type: 'Channel', id }));
        dispatch(fetchChannelInfo({ id }));
    }, [id, dispatch])

    useEffect(() => {
        // gets the info of users not yet a member of the channel and stores it on usersNotOnChannel useState.
        const setNonMembersInfo = (channelMembers) => {
            if (channelMembers) {
                let memberIds = channelMembers.map(member => member.user_id)
        
                users.forEach(user => {
                    if (!memberIds.includes(user.id)) {
                        setUsersNotOnChannel(previous => [...previous, user])
                    }
                })
            }
        }

        // gets the info of channelMembers from users and stores it on memberList useState.
        const setUserInfoOnMemberList = (channelMembers) => {
            if (channelMembers) {
                channelMembers.forEach(member => {
                    const user = users.find(user => user.id === member.user_id)
                    setMemberList(previous => [...previous, user]);
                })
            }
        }
        
        setMemberList([]);
        setUsersNotOnChannel([]);
        setUserInfoOnMemberList(channelInfo.channel_members);
        setNonMembersInfo(channelInfo.channel_members);
        setTotalMembers(channelInfo.channel_members?.length)
    }, [channelInfo, users])

    useEffect(() => {
        socket.current = io(`http://localhost:${process.env.REACT_APP_SOCKET_PORT}`);
        // get the `getMessage` response from socket
        socket.current.on('getMessage', payload => {
            setArrivalMessage(payload);
        })
    }, [])

    // prevent rerender of component
    useEffect(() => {
        if (arrivalMessage && (arrivalMessage.type === 'channel' && arrivalMessage.roomId === id)) {
            dispatch(setConversation(arrivalMessage));
        }
    }, [arrivalMessage, dispatch, id])

    const addMemberToChannel = async (memberId) => {
        const payload = { 
            id, 
            member_id: memberId 
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
                roomId: id,
                name: sender.name,
                image: sender.image,
                body: [value],
                type: 'channel',
                sender: Cookies.get('uid')
            }
            const messagePayload = {
                receiver_id: id,
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

    const handleShowMemberListModal = () => {
        setShowMemberList(!showMemberList);
        setUsersNotOnChannel([...usersNotOnChannel, ...selectedUsers]);
        setSelectedUsers([]);
    }

    // add selected users to the channel
    const handleAddUsers = (newMembers) => {
        newMembers.forEach(member => {
            addMemberToChannel(member.id)
            setMemberList(previous => [...previous, member]);
        })
        const array = newMembers.map(member => member.id)
        setSelectedUsers([]);
        setTotalMembers(previous => previous += newMembers.length);
        setUsersNotOnChannel(usersNotOnChannel.filter(user => !array.includes(user.id)));
        handleShowMemberListModal();
    }

    const handleUserSelection = (item) => {
        toggleSearchList();
        setSearchedQuery('');
        setSelectedUsers(previous => [...previous, item]);
        setUsersNotOnChannel(usersNotOnChannel.filter(user => user.email !== item.email));
    }

    const toggleSearchList = () => {
        setIsClicked(!isClicked);
    }

    const handleRemoveUser = (item) => {
        setUsersNotOnChannel(previous => [...previous, item])
        setSelectedUsers(selectedUsers.filter(user => user.email !== item.email))
    }

    const handleSearchQueryChange = (e) => {
        setSearchedQuery(e.target.value);
    }

    return (
       <div className="message-container container full-content d-flex flex-column justify-bottom" style={{ paddingTop: '0px', paddingLeft: '0px' ,paddingRight: '0px' }}>
            <PageHeader 
                title={channelInfo ? channelInfo.name : window.location = '/compose'} 
                buttonLabel={`Members ${totalMembers}`}  
                handleButtonClick={handleShowMemberListModal}
            />
             { 
                showMemberList && 
                <div className="wrapper-blackout-backdrop">
                    <OutsideClickHandler onOutsideClick={handleShowMemberListModal}>
                        <ChannelMemberList 
                            channelName={channelInfo.name}
                            memberList={memberList}
                            usersNotOnChannel={usersNotOnChannel}
                            setUsersNotOnChannel={setUsersNotOnChannel}
                            handleAddUsers={handleAddUsers}
                            handleShowMemberListModal={handleShowMemberListModal}
                            handleUserSelection={handleUserSelection}
                            isClicked={isClicked}
                            toggleSearchList={toggleSearchList}
                            selectedUsers={selectedUsers}
                            handleRemoveUser={handleRemoveUser}
                            handleSearchQueryChange={handleSearchQueryChange}
                            searchedQuery={searchedQuery}
                        />
                    </OutsideClickHandler>
                 </div>
            }
            <div className='message-container d-flex flex-column' style={{padding: '0px', paddingLeft: '20px', paddingRight: '20px'}}>
                <Messages 
                    messages={conversation}
                    page='channel'
                    channelName={channelInfo.name}
                />
                <TextArea
                    placeholder={`Message ${channelInfo.name}`}
                    handleOnChange={handleOnChange}
                    value={value}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default ChannelMessages;
