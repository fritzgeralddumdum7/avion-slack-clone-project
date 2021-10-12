import { NavLink } from "react-router-dom";
import Image from '../Image/Image';
import { AiOutlineLock } from 'react-icons/ai';
import './SearchListItem.scoped.css';

function SearchListItem ({ item, customClass, handleClick, isNavLink=true }) {
    let imgStyle = { height: '20px', width: '20px', marginRight: '10px', borderRadius: '4px' }
    let itemImage = <Image source={ item.image } customStyle={ imgStyle } />

    if (item.image === undefined) {
        itemImage = <AiOutlineLock/>
    }

    if (customClass==='channel-member-searchlist') {
        imgStyle = { height: '36px', width: '36px', marginLeft: '30px', borderRadius: '4px' }
    }
    return (
        <div>
            {
            (isNavLink) ? 
            <li className={customClass}>         
                <NavLink className="nav-link" to='/' >
                    {itemImage}
                    {item.email}
                </NavLink> 
            </li>
            :                          
            <li className={customClass} onClick={() => handleClick(item)} >                
                <div className="div-list-item" onClick={() => handleClick(item)} >
                    {itemImage}
                    {item.email}
                </div> 
            </li>
            }
        </div>
    )
}

export default SearchListItem;
