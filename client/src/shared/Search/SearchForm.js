import React, { useRef, useEffect } from 'react'; 
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import SearchList from './SearchList';
import SearchInput from './SearchInput';

import './SearchForm.scoped.css';

function SearchForm({ 
  handleClick, 
  handleOnChange, 
  searched,
  results
}) {
    const searchInputRef = useRef(null);
    
    useEffect(() => {
      searchInputRef.current.focus();
    }, [])

    return (
      <div className="container-searchform flex-column">
          <div className="d-flex">
            <BiSearch className="search-icon icon"/>
            <SearchInput 
              searchInputRef={searchInputRef}
              searched={searched}
              readOnly={false}
              handleOnChange={handleOnChange}
              handleClick={handleClick}
              placeholder={`You're digging in the right place`}
              customClass='search-form-input'
            />
            <AiOutlineClose className="close-icon icon" onClick={handleClick}/>
        </div>
        <SearchList 
          results={results}
          searched={searched}
          customClass='header-searchlist'
          hasFooter={true}
        />
      </div>
    )
}

export default SearchForm;
