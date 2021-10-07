import React, { useRef, useEffect } from 'react';
import Image from '../Image/Image';

import './Message.scoped.css';

function Message ({ image, name, bodies }) {
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
    }, [name])


    return (
        <div className="d-flex item" ref={scrollToLastMessageRef}>
            <Image 
                source={image}
                width={36}
                customStyle={imgStyle}
            />
            <div className='message-content'>   
                <h4>{ name }</h4>
                <div className="d-flex flex-column message-gap">
                    { bodies.map((body, i) =><small key={i}>{ body }</small>) }
                </div>
            </div>  
        </div>
    )
}

export default Message;
