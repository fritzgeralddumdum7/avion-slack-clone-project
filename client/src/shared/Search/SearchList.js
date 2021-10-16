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
         <footer>Not the results you expected? <label>Give feedback</label> or <label>learn more</label></footer>
        }
         </div>
    )
}

export default SearchList;
