import '../NavLinkList/NavLinkList';
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';
import NavLinkList from '../NavLinkList/NavLinkList';
import './CollapsableNavLinkList.scoped.css';

function CollapsableNavLinkList ({ children, label, isToggled, list, handleToggle, hasImage, hasLabel, type }) {
    return (
    <div className="parent-navlink" onClick={handleToggle}>
        <div className="d-flex align-middle parent-navlink-item">
            { !isToggled ? 
                <VscTriangleRight className="vsc-triangle" /> :
                <VscTriangleDown className="vsc-triangle" />
            }
            {label}
        </div>
        { 
            isToggled &&
                <div>
                    <NavLinkList 
                        list={list} 
                        hasLabel={hasLabel} 
                        hasImage={hasImage}
                        type={type}
                    />
                    {children}
                </div>
        }
    </div>
    )
}

export default CollapsableNavLinkList;
