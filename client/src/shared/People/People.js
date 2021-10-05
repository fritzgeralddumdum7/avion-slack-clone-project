import React from 'react';




import './People.scoped.css'


function People ({name, bio, image}) {

return (
    <div class="card-container">
        <div class="card">
            <img src={image} />            
        <div class="label">
            <h3><b>{name}</b> </h3>
            <p>{bio}</p>
        </div>
        </div>
    </div>
)
}

export default People;