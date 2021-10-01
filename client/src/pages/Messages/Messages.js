import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { alignMessagesWithUser, isEmpty } from '../../utils';
import Cookies from 'js-cookie';
import MessageItem from './component/MessageItem';
import MessageApi from '../../api/MessageApi';
import TextArea from '../../shared/TextArea/TextArea';
import faker from 'faker';
import io from 'socket.io-client'

import './Messages.scoped.css';

const socket = io.connect('http://localhost:8080')

function Messages () {
    const [user, setUser] = useState({
        name: '',
        image: ''
    })
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [receiver, setReceiver] = useState({});
    const [sender, setSender] = useState({});
    const [recipientEmail, setRecipientEmail] = useState('');
    const { receiverId } = useParams();

    useEffect(() => {
        retrieveMessage();
    }, [receiverId]);
    
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

    const handleSendMessage = () => {
        const payload = {
            id: receiverId,
            name: sender.name,
            image: sender.image,
            body: [value],
            recipient: recipientEmail,
            sender: Cookies.get('uid')
        }

        // pass the payload to the server
        socket.emit('send-message', { payload })
        setValue('');
    }

    useEffect(() => {
        // receive the request from the server
        socket.on('receive-message', ({ payload }) => {
            if (payload.sender === Cookies.get('uid') || payload.recipient === Cookies.get('uid')) {
                setMessages([...messages, payload])
            }
        })
    })

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
