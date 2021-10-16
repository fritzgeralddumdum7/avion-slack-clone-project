import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { AiOutlineClose } from 'react-icons/ai';
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

    useEffect(() => {
        const handleResults = () => {
            ownedChannels && ownedChannels.map(item => setResults(currentResults => [...currentResults, item]));
            users.map(item => setResults(currentResults => [...currentResults, item]));
        }

        handleResults();
    }, [users, ownedChannels])

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    const handleOnChange = (e) => {
        setSearched(e.target.value);
    }

    const clearSearch = () => {
        setSearched('');
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
                    />
                </OutsideClickHandler>
            }
        </div>
    )
}

export default Search;
