import React, { useRef, useEffect } from 'react';
import Image from '../../../shared/Image/Image';

import './MessageItem.scoped.css';

function MessageItem ({ message }) { 
    const imgStyle = {
        height: '36px',
        borderRadius: '4px'
    }
    const scrollToLastMessageRef = useRef();

    useEffect(() => {
        scrollToLastMessageRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end' 
        });
    }, [message])

    return (
        <div className="d-flex item xd" ref={scrollToLastMessageRef}>
            <Image 
                source={message.image}
                width={36}
                customStyle={imgStyle}
            />
            <div className='message-content'>   
                <h4>{ message.name }</h4>
                <div className="d-flex flex-column message-gap">
                    { message.body.map((body, i) =><small key={i}>{ body }</small>) }
                </div>
            </div>  
        </div>
    )
}

export default MessageItem;
