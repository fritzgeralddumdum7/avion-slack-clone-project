import SearchListItem from './SearchListItem'
import './SearchList.scoped.css';

function SearchList ({ results, searched, customClass, handleClick, isNavLink, hasFooter=false }) {

    return (
        <div className='wrapper'>
        <ul className={customClass}>
          { results.map((item, index) => (item.email + item.name).toLowerCase().includes(searched.toLowerCase()) && 
          <SearchListItem key={index} item={item} customClass={customClass} handleClick={handleClick} isNavLink={isNavLink}/>) }
        </ul>
        { hasFooter &&
          <div className="d-flex">
            <div className='footer-search-text'>
                <span>Not the results you expected?&nbsp;</span>
                <label>Give feedback&nbsp;</label> 
                <span>or&nbsp;</span>
                <label>learn more</label>
              </div>
          </div>
        }
         </div>
    )
}

export default SearchList;
