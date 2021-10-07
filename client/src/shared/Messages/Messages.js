import React from 'react';

import Message from './Message';

import './Messages.scoped.css';

function Messages ({ messages }) {
    return (
        <div className="content">
            {
                messages.map((message, i) => {
                    return <Message
                        key={i}
                        image={message.image}
                        name={message.name}
                        bodies={message.body}
                    />
                })
            }
        </div>
    )
}

export default Messages;
