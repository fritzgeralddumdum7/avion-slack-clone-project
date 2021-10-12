import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { AiOutlineClose, AiOutlineLock } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';


import SearchForm from '../../Search/SearchForm';
import SearchInput from '../../Search/SearchInput';

import './Search.scoped.css';

function Search () {
    const [isClicked, setIsClicked] = useState(false);
    const [searched, setSearched] = useState('');
    const [results, setResults] = useState([]);
    const { 
        users,
        ownedChannels 
    } = useSelector(state => state.users);

    useEffect(async () => {
        handleResults();
    }, [])

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const clearSearch = () => {
        setSearched('');
    }

    const handleResults = () => {
        ownedChannels.map((item, index) => {
            setResults(currentResults => [...currentResults, {email: item.name, id: item.id, name: item.name, owner_id: item.owner_id}]);
        });
        users.map((item, index) => {
            setResults(currentResults => [...currentResults, item])
        });
    }

    return (
        <div className="container-searchBar">
            <div className="search-wrapper">
                <SearchInput 
                    searched={searched && 'Search: ' + searched}
                    readOnly={true}
                    handleOnChange={handleOnChange}
                    handleClick={handleClick}
                    placeholder={`Search here...`}
                    customClass='search-form-default'
                />
                { !searched ? <FiSearch /> : <AiOutlineClose onClick={clearSearch} /> }
            </div>
            { isClicked && 
                <OutsideClickHandler onOutsideClick={() => setIsClicked(!isClicked)}>
                    <SearchForm
                        searched={searched}
                        handleOnChange={handleOnChange}
                        results={results}
                        handleClick={handleClick}
                    />
                </OutsideClickHandler>
            }
        </div>
    )
}

export default Search;
