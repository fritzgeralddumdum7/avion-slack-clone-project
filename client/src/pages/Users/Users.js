import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SearchList from '../../shared/Search/SearchList';
import SearchInput from '../../shared/Search/SearchInput';

import './Users.scoped.css'
function Users () {
    
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState('');
    const { 
        users
    } = useSelector(state => state.users);
    
    useEffect(() => {
       setResults(users);
     }, [users]);

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const handleClick = () => {
        console.log('clicked')
    }
        
return (
    <div className='full-content container-compose-message'>
        <div>
            <header>
                <h3>MEMBERS</h3>
            </header>
            <SearchInput 
                searched={searched}
                readOnly={false}
                handleOnChange={handleOnChange}
                placeholder={'@somebody, or somebody@example.com'}
                customClass='search-input-create-channel'
            />
            <SearchList 
                    results={results}
                    searched={searched}
                    customClass='all-users-searchlist'
                    handleClick={handleClick}
                    isNavLink={false}
            />
            </div>
        </div> 
    )
}

export default Users;
