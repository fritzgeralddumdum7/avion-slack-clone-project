import React, { useRef, useEffect } from 'react';

import Image from '../Image/Image';

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
            {/* <Image 
                source={image}
                width={36}
                customStyle={imgStyle}
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '38px' }}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
