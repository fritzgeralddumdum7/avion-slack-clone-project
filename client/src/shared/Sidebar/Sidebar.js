import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { TiMessages } from 'react-icons/ti';
import { BiMessageRoundedDetail, BiDotsVerticalRounded } from 'react-icons/bi';
import { FaRegSmile, FaRegSave } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';
import { BsPlusSquare } from 'react-icons/bs';

// import redux to call the states from the redux
// use the useSelector hook to call a state from the redux
// use the useDispatch hook to trigger an api function from the redux
import { useDispatch, useSelector } from 'react-redux';

import CollapsableNavLinkList from './component/CollapsableNavLinkList/CollapsableNavLinkList';
import LogoutButton from '../Button/Button';

import AuthApi from '../../services/AuthApi';

import './Sidebar.scoped.css';

// dispatching a specific redux fetch api function
// the following fetch functions can be find in `../../redux/users`
import { 
    fetchAllUsers,
    fetchRecentMessages,
    fetchOwnedChannels
} from '../../redux/users';

function Sidebar () {
    // using `dispatch` can trigger/run the function APIs stated above
    const dispatch = useDispatch();

    // these are from the redux users initialState
    // these contains response data from the api
    const { recentMessages, ownedChannels } = useSelector(state => state.users);

    // dispatches all fetch api
    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchOwnedChannels());
        dispatch(fetchRecentMessages());
    }, [])

    const handleLogout = () => {
        AuthApi.logout();
        window.location = '/login';
    }

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
            <div>
                <NavHeader />
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
                    <FiUsers /> People & user groups
                </NavLink>
                <div className="more">
                    <BiDotsVerticalRounded className="more-icon" /> More
                </div>
                <div className='wrapper'>
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
            <div className="logout-container" style={{ padding: '0 25px' }}>
                <LogoutButton 
                    text='LOGOUT' 
                    handleClick={handleLogout}
                    customClass="logout-btn"
                />
            </div>
        </nav>
    )
}

export default Sidebar;
