import React from 'react';
import Image from '../Image/Image';

import './Banner.scoped.css';

function Banner ({ description }) {
    const customStyle = {
        height: 34
    }

    return (
        <div className="text-center">
            <Image 
                source='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg'
                customStyle={customStyle}
            />
            <h1>{ description }</h1>
            <div className="description">We suggest using the <strong>email address you use at work.</strong></div>
        </div>
    )
}

export default Banner;
