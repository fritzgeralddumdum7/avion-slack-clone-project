import React from 'react';

import Message from './Message';
import Image from '../Image/Image';
import Divider from '../Divider/Divider';

import './Messages.scoped.css';

function Messages ({ 
    messages, 
    selectedUser = {}, 
    hasSelectedUser = true,
    page,
    channelName
}) {
    const styles = {
        pointerEvents: 'none',
        borderRadius: '50%'
    }
    const NoConversation = ({ image, name, email }) => {
        return (
            <div className="d-flex flex-column no-convo">
                <div className="d-flex flex-row card">
                    <Image
                        width={70}
                        source={image}
                        customStyle={styles}
                    />
                    <div className="d-flex flex-column info">
                        <h3>{ name }</h3>
                        <label>{ email }</label>
                        <small>Avion Slack Member</small>
                    </div>
                </div>
                <label className="short-desc">
                    This is the very beginning of your direct message history with <label>@{ name }</label>. Only the two of you are in this conversation, and no one else can join it. <label className="normal-link">Learn more</label>
                </label>
            </div>
        )
    }
    const NoChannelConversation = ({ name }) => {
        return (
            <div className="d-flex flex-column no-convo">
                <label className="short-desc">
                    This is the very beginning of this channel <label>@{ name }</label>. Send HI to the members.
                </label>
            </div>
        )
    }

    return (
        <div className="content" style={{ paddingTop: '20px' }}>
            {
                messages.length > 0 &&
                    messages.map((item, i) => {
                        return <div key={i} className="d-flex flex-column">
                                <Divider 
                                    key={i}
                                    text={item.locale} 
                                />
                                {
                                    item.convos.map((message, i) => {
                                        return <Message
                                            key={i}
                                            image={message.image}
                                            name={message.name}
                                            bodies={message.body}
                                            time={message.time}
                                        />
                                    })
                                }
                            </div>
                    }) 
            }
            { 
                hasSelectedUser && selectedUser.hasOwnProperty('uid') && messages.length === 0 &&
                    <NoConversation 
                        image={selectedUser.image}
                        name={selectedUser.name}
                        email={selectedUser.uid}
                    />
            }
            {
                !hasSelectedUser && !messages.length &&
                    <NoConversation 
                        image={selectedUser?.image}
                        name={selectedUser?.name}
                        email="email@example.com"
                    />
            }
            {
                page === 'channel' && !messages.length &&
                    <NoChannelConversation name={channelName} />
            }
        </div>
    )
}

export default Messages;
