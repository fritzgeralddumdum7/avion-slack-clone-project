import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { alignMessagesWithUser, isEmpty } from '../../utils';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';

import Messages from '../../shared/Messages/Messages';
import TextArea from '../../shared/TextArea/TextArea';
import PageHeader from '../../shared/PageHeader/PageHeader';

import MessageApi from '../../api/MessageApi';

function UserMessages () {
    const { receiverId } = useParams();

    // states
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState({});
    const [sender, setSender] = useState({});
    const [value, setValue] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // refs
    const socket = useRef();
    const currentUser = useRef({
        uid: Cookies.get('uid'),
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        image: faker.fake("{{image.avatar}}")
    });

    useEffect(() => {
    
        const retrieveMessage = async () => {
            const fakeSender = {
                name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                image: faker.fake("{{image.avatar}}")
            }
            const fakeReceiver = {
                name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                image: faker.fake("{{image.avatar}}")
            }
    
            setReceiver(fakeReceiver);
            setSender(fakeSender);
        
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
                            if (isEmpty(recipientEmail)) {
                                setRecipientEmail(data['sender'].uid)
                            }
                        }
                        return data;
                    })
                    setMessages(alignMessagesWithUser(data));
                })
                .catch(error => console.log(error.response.data.errors))
        }

        retrieveMessage();
    }, [receiverId, recipientEmail]);

    useEffect(() => {
        socket.current = io(`http://localhost:${process.env.REACT_APP_SOCKET_PORT}`);
        // get the `getMessage` responce from socket
        socket.current.on('getMessage', payload => {
            setArrivalMessage(payload);
        })
    }, [])

    // prevent rerender of component
    useEffect(() => {
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    // connect users to socket server
    useEffect(() => {
        socket.current.emit('initUser', currentUser.current.uid);
        socket.current.on('getUsers', users => {
            console.log(users);
        });
    }, [currentUser])

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!isEmpty(value.trim())) {
            let payload = {
                id: receiverId,
                roomId: receiverId,
                name: sender.name,
                image: sender.image,
                body: [value],
                recipient: recipientEmail,
                sender: currentUser.current
            }
            const type = recipientEmail === Cookies.get('uid') ? 'self' : 'direct-message';
            const messagePayload = {
                receiver_id: receiverId,
                receiver_class: 'User',
                body: value
            }
            payload = {
                ...payload,
                type: type
            }

            await MessageApi.send(messagePayload)
                .then(res => {
                    console.log(res);
                    // pass the payload to the socket server
                    socket.current.emit('sendMessage', { payload });
                    if (type !== 'self') {
                        setMessages([...messages, payload]);
                    }
                    setValue('');
                })
                .catch(error => console.log(error.response.data.errors))
    
        }
    }

    return (
        <div className="message-container container full-content d-flex flex-column justify-bottom" style={{ gap: '20px', paddingTop: '0px', paddingLeft: '0px' ,paddingRight: '0px' }}>
            <PageHeader 
                title={receiver.name}
                buttonLabel='Members'  
                hasButton={false}
            />
            <div className='message-container d-flex flex-column' style={{padding: '0px', paddingLeft: '20px', paddingRight: '20px'}}>
                <Messages messages={messages} selectedUser={currentUser.current} />
                <TextArea
                    placeholder={`Message ${receiver.name}`}
                    handleOnChange={handleOnChange}
                    value={value}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default UserMessages;
