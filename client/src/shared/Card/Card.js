import React from 'react';
import Button from '../../shared/Button/Button';

import './Card.scoped.css'

function Card ({name, bio, image}) {

    const time = new Date();
    const today = time.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
   
return (
    <div class="card-container d-flex flex-column">
        <div class="d-flex flex-column">
            <img src={image} />  
        </div>
        <div>       
            <div class="profile-content d-flex flex-column align-center footer">           
                <h3><b>{name}</b></h3>
                <p>{bio}</p>
                <a href="">View Profile</a><br />
                <p>Local Time<br />{today}</p>
            </div>
            <div class="btn-message">
                <Button 
                text='Message'
                />
            </div>
        </div>
    </div>
    )
}

export default Card;