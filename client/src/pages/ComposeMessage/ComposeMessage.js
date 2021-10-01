import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Faker from 'faker';
import SearchInput from '../../shared/Search/SearchInput';
import TextArea from '../../shared/TextArea/TextArea';
import SearchList from '../../shared/Search/SearchList';
import UserApi from '../../api/UserApi';
import './ComposeMessage.scoped.css';

function ComposeMessage () {
    const [searched, setSearched] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        getAllUsers();
     }, []);

    const getAllUsers = async () => {
        await UserApi.all()
          .then(res => handleUsers(res.data.data))
          .catch(error => console.log(error.response.errors))
      }

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const handleUsers = (array) => {
        array = array.filter(item => item.uid === Cookies.get('uid'))
            .concat(array.filter(item => item.uid !== Cookies.get('uid')));
            
        array.map(item => {
            item.name=Faker.fake("{{name.firstName}} {{name.lastName}}");
            item.image=Faker.fake("{{image.avatar}}");
        });
        let array2=[];
        for(let i = 0; i < 20; i++) {
            array2.push(array[i]);
        }
        setResults(array); 
    }

    return (
        <div className='full-content container-compose-message'>
            <div>
                <header>
                    <h3>New message</h3>
                </header>
                <div className="search-input">
                    <span className='label-to'>To: </span>
                    <SearchInput 
                        searched={searched}
                        readOnly={false}
                        handleOnChange={handleOnChange}
                        placeholder={'#a-channel, @somebody, or somebody@example.com'}
                        customClass='search-input-compose'
                    />
                </div>
                {searched!==''  && 
                <div className="wrapper-searchlist">
                    <div className="container-searchlist">
                        <SearchList 
                            results={results}
                            searched={searched}
                            customClass='compose-message-search'
                        />
                    </div>
                </div>}
            </div>
            <div className="container-textarea">
              <TextArea />
            </div>
        </div>
    )
}

export default ComposeMessage;
