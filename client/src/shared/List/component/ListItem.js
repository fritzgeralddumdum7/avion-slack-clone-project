import Image from "../../Image/Image";
import  './ListItem.scoped.css'
import { MdClose } from 'react-icons/md';

function ListItem ({ item, customClass, removeItem }) {
    let imgStyle = { height: '36px', width: '36px', marginRight: '10px', borderRadius: '5px' }
    if (customClass === 'add-channel-list') {
        imgStyle = { height: '25px', width: '25px', marginRight: '10px', borderRadius: '4px' }
    }

    return(
        <li onClick={() => removeItem(item)} className={customClass}>
            <Image source={ item.image } customStyle={ imgStyle } />
            {item.email}     
            {customClass='add-channel-list' && <MdClose id="remove-icon" style={{justifySelf: 'end'}}/>  }
        </li>
    )
}

export default ListItem;