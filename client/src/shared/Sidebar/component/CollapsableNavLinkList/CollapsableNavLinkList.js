import '../NavLinkList/NavLinkList';
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';
import NavLinkList from '../NavLinkList/NavLinkList';
import './CollapsableNavLinkList.scoped.css';

function CollapsableNavLinkList ({ label, isToggled, list, handleToggle, hasImage, hasLabel }) {
    return (
    <div className="parent-navlink" onClick={handleToggle}>
        <div className="d-flex align-middle parent-navlink-item">
            { !isToggled ? 
                <VscTriangleRight className="vsc-triangle" /> :
                <VscTriangleDown className="vsc-triangle" />
            }
            {label}
        </div>
        { isToggled &&
            <NavLinkList list={list} hasLabel={hasLabel} hasImage={hasImage}/>
        }
    </div>

    )
    
}

export default CollapsableNavLinkList;
