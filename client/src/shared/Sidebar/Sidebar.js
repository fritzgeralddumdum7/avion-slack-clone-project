import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { TiMessages } from 'react-icons/ti';
import { BiMessageRoundedDetail, BiDotsVerticalRounded } from 'react-icons/bi';
import { FaRegSmile, FaRegSave } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';
import { BsPlusSquare } from 'react-icons/bs';

// import redux to call the states from the redux
// use the useSelector hook to call a state from the redux
// use the useDispatch hook to trigger an api function from the redux
import { useSelector } from 'react-redux';

import CollapsableNavLinkList from './component/CollapsableNavLinkList/CollapsableNavLinkList';

import './Sidebar.scoped.css';

function Sidebar () {

    // these are from the redux users initialState
    // these contains response data from the api
    const { 
        recentMessages, 
        ownedChannels
    } = useSelector(state => state.users);

    const NavHeader = () => {
        return (
            <header className="d-flex align-middle">
                Avion Slack
                <NavLink className='compose-nav-link' activeClassName='compose-nav-link' to='/compose' >
                    <button className="new-message">
                        <IoCreateOutline className="io-create" />
                        <span className="new-hover">New Message</span>
                    </button>
                </NavLink>
            </header>
        );
    }

    return (
        <nav>
            <NavHeader />
            <div>
                <NavLink to="/threads" exact>
                    <BiMessageRoundedDetail className="bi-thread-icon" /> Threads
                </NavLink>
                <NavLink to="/all-dms" exact>
                    <TiMessages /> All DMs
                </NavLink>
                <NavLink to="/activity-page" exact>
                    <FaRegSmile /> Mentions & reactions
                </NavLink>
                <NavLink to="/saved-page" exact>
                    <FaRegSave /> Saved items
                </NavLink>
                <NavLink to="/users" exact>
                    <FiUsers /> Users
                </NavLink>
                <div className="more">
                    <BiDotsVerticalRounded className="more-icon" /> More
                </div>
                <div className='wrapper'  style={{ height: '65vh', overflowY: 'auto' }}>
                    <div>
                        <CollapsableNavLinkList 
                            label='Channels' 
                            list={ownedChannels}
                            type='channel'
                        >
                            <NavLink to='/create-channel' className='add-channel-nav-link'>
                                <BsPlusSquare />
                                Add Channel
                            </NavLink>
                        </CollapsableNavLinkList>
                    </div>
                    <div>
                        <CollapsableNavLinkList 
                            label='Direct Messages' 
                            list={recentMessages}
                            hasImage={true}
                            hasLabel={true}
                            type='messages'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;
