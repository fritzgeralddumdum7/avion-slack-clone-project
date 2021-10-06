import React, { useState, useEffect } from 'react';
import UserApi from '../../api/UserApi';
import Card from '../../shared/Card/Card';
import Faker from 'faker';

function Users () {
    
    const [results, setResults] = useState([]);
    
    useEffect(() => {
       getUserList();
     }, []);

    const getUserList =  async () => {
        await UserApi.all()
          .then(res => handleUsers(res.data.data))
          .catch(error => console.log(error.response.errors))
}

const handleUsers = (array) => {
    array.map(item => {
        item.name=Faker.fake("{{name.firstName}} {{name.lastName}}");
        item.image=Faker.fake("{{image.avatar}}");
    });
    setResults(array); 
}
    
return (
    <div className='full-content container-compose-message'>
        <div>
            <header>
                <h3>MEMBERS</h3>
            </header>
           {results.map((user, index) =>{
               return < Card name={user.name} email={user.email} image={user.image}/>
           })}
            
        </div>
    </div>
                
    )
}

export default Users;

