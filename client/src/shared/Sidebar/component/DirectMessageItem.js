import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import style from './DirectMessageItem.scoped.css';
import Image from '../../Image/Image';

function DirectMessageItem ({ item, showCloseIcon,loggedInUserId }) {
    const imgStyle = { borderRadius: '4px' }

    return (
        <NavLink 
            onMouseEnter={showCloseIcon} 
            to={`../messages/${item.id}`} 
            className="direct-message-item">
            <Image 
                source={item.image} 
                width={20}
                customStyle={imgStyle}
            /> {item.name}
            <span>{ item.uid === Cookies.get('uid') ? 'you guest' : 'guest' }</span>   
        </NavLink>
    )
}

export default DirectMessageItem;
