import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';

import { alignMessagesWithUser, isEmpty } from '../../utils';

import TextArea from '../../shared/TextArea/TextArea';
import Messages from '../../shared/Messages/Messages';

import ChannelApi from '../../api/ChannelApi';
import MessageApi from '../../api/MessageApi';

function ChannelMessages () {
    const { channelId } = useParams();

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef();
    const currentUser = useRef({
        uid: Cookies.get('uid'),
        name: faker.fake("{{name.firstName}} {{name.lastName}}"),
        image: faker.fake("{{image.avatar}}")
    });

    useEffect(() => {
        fetchChannelMessages();
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
        
        await ChannelApi.messages(channelId)
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
                        // if (isEmpty(recipientEmail)) {
                        //     setRecipientEmail(data['sender'].uid)
                        // }
                    }
                })
                setMessages(alignMessagesWithUser(data));
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="message-container container full-content d-flex flex-column">
            <Messages messages={messages} />
            <TextArea
                placeholder={`Send your message here...`}
                handleOnChange={handleOnChange}
                value={value}
                handleSendMessage={handleSendMessage}
            />
        </div>
    )
}

export default ChannelMessages;
