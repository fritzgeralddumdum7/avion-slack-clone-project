import { NavLink } from "react-router-dom";
import style from './NavLinkItem.scoped.css';
import Image from '../../../Image/Image';
import Cookies from "js-cookie";
import { FiLock } from 'react-icons/fi';

function NavLinkItem ({ 
    item, 
    showCloseIcon, 
    hasImage = false, 
    hasLabel = false,
    type
}) {
    const imgStyle = { borderRadius: '4px' }

    return (
        <NavLink 
            onMouseEnter={showCloseIcon} 
            to={`../${type}/${item.id}`}
            exact 
            activeClassName={style.isActive} 
            className="nav-link-item">
            { 
                hasImage ? 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '15px' }}>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                :
                <FiLock />
            }   
            { item.name }
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
