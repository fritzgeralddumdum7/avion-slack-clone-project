import NavLinkItem from '../NavLinkItem/NavLinkItem';
import './NavLinkList.scoped.css'

function NavLinkList ({ list, hasImage, hasLabel, type }) {
    return (
        <ul>
            { list.map(item => {
                return <NavLinkItem 
                    key={item.id} 
                    item={item} 
                    hasLabel={hasLabel}
                    hasImage={hasImage}
                    type={type}
                />
            }) }
        </ul>
    )
}

export default NavLinkList;
