import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { alignMessagesWithUser, isEmpty } from '../../utils';
import Cookies from 'js-cookie';
import MessageItem from './component/MessageItem';
import MessageApi from '../../api/MessageApi';
import TextArea from '../../shared/TextArea/TextArea';
import faker from 'faker';
import { io } from 'socket.io-client';

import './Messages.scoped.css';

function Messages () {
    const { receiverId } = useParams();

    const socket = useRef(io(`http://localhost:${process.env.REACT_APP_SOCKET_PORT}`));

    // states
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState({});
    const [sender, setSender] = useState({});
    const [value, setValue] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // refs
    const currentUser = useRef(Cookies.get('uid'));

    useEffect(() => {
        retrieveMessage();
    }, [receiverId]);

    useEffect(() => {
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
        socket.current.emit('initUser', currentUser.current);
        socket.current.on('getUsers', users => {
            console.log(users);
        });
    }, [currentUser])
    
    const retrieveMessage = async () => {
        const params =`receiver_class=User&receiver_id=${receiverId}`
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
    
        await MessageApi.retrieve(params)
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
                })
                setMessages(alignMessagesWithUser(data));
            })
            .catch(error => console.log(error.response.data.errors))
    }

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (!isEmpty(value.trim())) {
            const payload = {
                id: receiverId,
                name: sender.name,
                image: sender.image,
                body: [value],
                recipient: recipientEmail,
                sender: currentUser.current
            }
    
            // pass the payload to the socket server
            socket.current.emit('sendMessage', { payload });
            setMessages([...messages, payload]);
            setValue('');
        }
    }

    return (
        <div className="container full-content d-flex flex-column justify-bottom" style={{ gap: '20px' }}>
            <div className="content">
                { 
                    messages.map((message, index) => {
                        return <MessageItem 
                            key={index} 
                            message={message} 
                        />
                    }) 
                }
            </div>
            <TextArea
                placeholder={`Message ${receiver.name}`}
                handleOnChange={handleOnChange}
                value={value}
                handleSendMessage={handleSendMessage}
            />
        </div>
    )
}

export default Messages;
