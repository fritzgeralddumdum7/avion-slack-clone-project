import Image from "../../Image/Image";
import  './ListItem.scoped.css';

function ListItem ({ item, customClass, removeItem }) {
    const imgStyle = { height: '40px', width: '40px', marginRight: '10px', borderRadius: '4px' }

    return(
        <li className={customClass}>
            <Image source={ item.image } customStyle={ imgStyle } />
            {item.email}     
            <button onClick={() => removeItem(item)}>Remove</button>
        </li>
    )
}

export default ListItem;