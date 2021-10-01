import SearchListItem from './SearchListItem'
import './SearchList.scoped.css';

function SearchList ({ results, searched, customClass }) {

    return (
        <ul>
          { results.map((item, index) => item.name.toLowerCase().includes(searched.toLowerCase()) && 
          <SearchListItem key={index} item={item} customClass={customClass} />) }
          <li>Not the results you expected? <a href="#">Give feedback</a> or <a href="#">learn more</a></li>
        </ul>
    )
}

export default SearchList;
