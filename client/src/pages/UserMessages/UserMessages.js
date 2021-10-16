import React, { 
    useEffect, 
    useState, 
    useRef 
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import moment from 'moment';

import Messages from '../../shared/Messages/Messages';
import TextArea from '../../shared/TextArea/TextArea';
import PageHeader from '../../shared/PageHeader/PageHeader';

import { 
    fetchConversation,
    setConversation
} from '../../redux/messages';

import { isEmpty } from '../../utils';

import MessageApi from '../../api/MessageApi';

function Conversation () {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { 
        conversation, 
        recipient,
        sender
    } = useSelector(state => state.messages);

    const socket = useRef();

    const [value, setValue] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchConversation({ type: 'User', id }));
        }
    }, [id, dispatch])

    useEffect(() => {
        socket.current = io(`http://localhost:${process.env.REACT_APP_SOCKET_PORT}`);
        // get the `getMessage` response from socket
        socket.current.on('getMessage', payload => {
            dispatch(setConversation(payload));
        })
        socket.current.emit('initUser', Cookies.get('uid'));
        socket.current.on('getUsers', users => {
            console.log(users);
        });
    }, [dispatch])

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!isEmpty(value.trim())) {
            let payload = {
                id: id,
                name: sender.name,
                image: sender.image,
                time: moment().format('LT'),
                body: [value],
                recipient: recipient.uid,
                sender: Cookies.get('uid')
            }
            const type = recipient.uid === Cookies.get('uid') ? 'self' : 'direct-message';
            const messagePayload = {
                receiver_id: id,
                receiver_class: 'User',
                body: value
            }
            payload = {
                ...payload,
                type: type
            }

            socket.current.emit('sendMessage', { payload });
            dispatch(setConversation(payload));
            setValue('');
            
            await MessageApi.send(messagePayload)
                .then(res => console.log(res))
                .catch(error => console.log(error.response.data.errors))
        }
    }

    return (
        <div className="message-container container full-content d-flex flex-column justify-bottom" style={{ gap: '20px', paddingTop: '0px', paddingLeft: '0px' ,paddingRight: '0px' }}>
            <PageHeader 
                title={recipient && recipient.name}
                hasButton={false}
            />
            <div className='message-container d-flex flex-column' style={{padding: '0px', paddingLeft: '20px', paddingRight: '20px'}}>
                <Messages messages={conversation} />
                <TextArea 
                    placeholder={`Message ${recipient && recipient.name}`}
                    handleOnChange={handleOnChange}
                    value={value}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default Conversation;
