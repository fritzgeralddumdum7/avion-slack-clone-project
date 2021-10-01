import React, { useState, useEffect } from 'react'; 
import SearchForm from '../../Search/SearchForm';
import OutsideClickHandler from 'react-outside-click-handler';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import SearchInput from '../../Search/SearchInput';

import './Search.scoped.css';

function Search () {
    const [isClicked, setIsClicked] = useState(false);
    const [searched, setSearched] = useState('');
    const [results, setResults] = useState([
        'Apple', 
        'Banana', 
        'Cupcake', 
        'AFile', 
        'Bfile', 
        'Cfile', 
        'Android', 
        'Boozy', 
        'Cooper'
    ]);

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
                        handleClick={handleClick}
                    />
                </OutsideClickHandler>
            }
        </div>
    )
}

export default Search;
