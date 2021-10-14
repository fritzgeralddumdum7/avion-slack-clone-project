import { NavLink } from "react-router-dom";
import Image from '../Image/Image';
import { AiOutlineLock } from 'react-icons/ai';
import './SearchListItem.scoped.css';

function SearchListItem ({ item, customClass, handleClick, isNavLink=true }) {
    let imgStyle = { height: '20px', width: '20px', marginRight: '10px', borderRadius: '4px' };
    let itemName = item.name + ' ' + item.email ;
    let type = 'messages';

    if (item.email === undefined) {
        itemName = item.name;
    }

    if (customClass === 'all-users-searchlist' || customClass === 'channel-member-searchlist' ) {
        imgStyle = { height: '40px', width: '40px', marginRight: '10px', borderRadius: '5px' };
        itemName =  
        <div className='d-flex flex-column'>
            <div className='name'>
             {item.name} 
             </div>
             <div className='email'>
             {item.email}
             </div>
        </div>
    } else if (customClass==='channel-member-searchlist') {
        imgStyle = { height: '36px', width: '36px', marginLeft: '30px', borderRadius: '4px' };
    }

    let itemImage = <Image source={ item.image } customStyle={ imgStyle } />

    if (item.image === undefined) {
        itemImage = <AiOutlineLock/>
        type = 'channel';
        
    }

    return (
        <div>
            {
            (isNavLink) ? 
            <li className={customClass}>         
                <NavLink to={`../${type}/${item.id}`} exact>
                    <div className='d-flex'>
                        {itemImage}
                        <div className='navlink-name'>
                            {itemName}
                        </div>
                    </div>
                </NavLink> 
            </li>
            :                          
            <li className={customClass} onClick={() => handleClick(item)} >                
                <div className="div-list-item" onClick={() => handleClick(item)} >
                    {itemImage}
                    {itemName}
                </div> 
            </li>
            }
        </div>
    )
}

export default SearchListItem;
