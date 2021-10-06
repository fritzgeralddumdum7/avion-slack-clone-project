import SearchListItem from './SearchListItem'
import './SearchList.scoped.css';

function SearchList ({ results, searched, customClass, handleClick, isNavLink }) {

    return (
        <ul>
          { results && results.map((item, index) => item.email.toLowerCase().includes(searched.toLowerCase()) && 
          <SearchListItem key={index} item={item} customClass={customClass} handleClick={handleClick} isNavLink={isNavLink}/>) }
          <li>Not the results you expected? <a href="#">Give feedback</a> or <a href="#">learn more</a></li>
        </ul>
    )
}

export default SearchList;
