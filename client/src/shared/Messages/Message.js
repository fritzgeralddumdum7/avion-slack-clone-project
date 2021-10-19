import React, { useRef, useEffect } from 'react';

import { FaRegUserCircle } from 'react-icons/fa';

import './Message.scoped.css';

function Message ({ image, name, bodies, time }) {
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
    }, [bodies])


    return (
        <div className="d-flex item" ref={scrollToLastMessageRef}>
            <FaRegUserCircle style={{width: '36px', height:'36px'}}/>
            <div className='message-content'>   
                <h4 className="d-flex align-middle">{ name }
                    <p className="time">{ time }</p>
                </h4>
                <div className="d-flex flex-column message-gap">
                    { bodies.map((body, i) =><small key={i}>{ body }</small>) }
                </div>
            </div>  
        </div>
    )
}

export default Message;
