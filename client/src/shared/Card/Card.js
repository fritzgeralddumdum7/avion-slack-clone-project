import React from 'react';

import './Card.scoped.css'

function Card ({name, email, image}) {

return (
    <div class="card-container d-flex flex-column">
        <div class="d-flex flex-column">
            <img src={image} />            
        <div class="d-flex flex-column align-center footer">           
            <h3><b>{name}</b></h3>
            <p>{email}</p>
        </div>
        </div>
    </div>
    )
}

export default Card;