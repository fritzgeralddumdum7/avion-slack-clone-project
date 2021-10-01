import { NavLink } from "react-router-dom";
import style from './NavLinkItem.scoped.css';
import Image from '../../../Image/Image';
import Cookies from "js-cookie";

function NavLinkItem ({ item, showCloseIcon, hasImage=false, hasLabel=false }) {
    const imgStyle = { borderRadius: '4px' }

    return (
        <NavLink 
            onMouseEnter={ showCloseIcon } 
            to={`../messages/${item.id}`} 
            exact 
            activeClassName={style.isActive} 
            className="nav-link-item">
            { 
                hasImage && 
                <Image
                    source={item.image} 
                    width={20}
                    customStyle={imgStyle}
                />
            }   
            {item.name}
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