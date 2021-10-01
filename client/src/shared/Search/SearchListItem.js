import { NavLink } from "react-router-dom";
import Image from '../Image/Image';
import './SearchListItem.scoped.css';

function SearchListItem ({ item, customClass }) {
    const imgStyle = { height: '20px', width: '20px', marginRight: '10px', borderRadius: '4px' }
    return (
    <li className={customClass}>
        <NavLink className="nav-link" to='/'>
            <Image source={ item.image } customStyle={ imgStyle } />
            { item.name }
        </NavLink>
    </li>
    )
}

export default SearchListItem;
