import { NavLink } from "react-router-dom";
import style from './NavLinkItem.scoped.css';
import Cookies from "js-cookie";
import { FiLock } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';

function NavLinkItem ({ 
    item, 
    showCloseIcon, 
    hasImage = false, 
    hasLabel = false,
    type
}) {
    let itemName = item.email

    if (item.email === undefined) {
        itemName = item.name; 
    }

    return (
        <NavLink 
            onMouseEnter={showCloseIcon} 
            to={`../${type}/${item.id}`}
            exact 
            activeClassName={style.isActive} 
            className="nav-link-item">
            { 
                hasImage ? 
                <FaRegUserCircle/>
                :
                <FiLock />
            }   
            { itemName }
            { 
                hasLabel &&
                <span className="guest-label">
                    { item.uid === Cookies.get('uid') ? 'you guest' : 'guest'}
                </span>
            }
        </NavLink>
    )
}

export default NavLinkItem;
