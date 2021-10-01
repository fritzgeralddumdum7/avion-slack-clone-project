import NavLinkItem from '../NavLinkItem/NavLinkItem';
import './NavLinkList.scoped.css'

function NavLinkList ({ list, hasImage, hasLabel}) {
    return (
        <ul>
            { list.map(item => {
                return <NavLinkItem 
                    key={item.id} 
                    item={item} 
                    hasLabel={hasLabel}
                    hasImage={hasImage}
                />
            }) }
        </ul>
    )
}

export default NavLinkList;
