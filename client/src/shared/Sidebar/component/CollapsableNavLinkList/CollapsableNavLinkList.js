import React, { useState } from 'react';
import '../NavLinkList/NavLinkList';
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';
import NavLinkList from '../NavLinkList/NavLinkList';
import './CollapsableNavLinkList.scoped.css';

function CollapsableNavLinkList ({ children, label, list, hasImage, hasLabel, type }) {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(!toggled);
    }

    return (
        <div className="parent-navlink">
            <div className="d-flex align-middle parent-navlink-item" onClick={handleToggle}>
                { !toggled ? 
                    <VscTriangleRight className="vsc-triangle" /> :
                    <VscTriangleDown className="vsc-triangle" />
                }
                { label }
            </div>
            { toggled &&
                <div className="auto-scroll">
                    <NavLinkList 
                        list={list} 
                        hasLabel={hasLabel} 
                        hasImage={hasImage}
                        type={type}
                    />
                    { children }
                </div>
            }
        </div>
    )
}

export default CollapsableNavLinkList;
