import NavLinkItem from '../NavLinkItem/NavLinkItem';
import './NavLinkList.scoped.css';

function NavLinkList ({ list, hasImage, hasLabel, type }) {
    return (
        <ul>
            {
                list.map((item, i) => {
                    return <NavLinkItem 
                        key={i} 
                        item={item} 
                        hasLabel={hasLabel}
                        hasImage={hasImage}
                        type={type}
                    />
                })
            }
        </ul>
    )
}

export default NavLinkList;
