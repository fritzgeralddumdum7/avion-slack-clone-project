import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { TiMessages } from 'react-icons/ti';
import { BiMessageRoundedDetail, BiDotsVerticalRounded } from 'react-icons/bi';
import { FaRegSmile, FaRegSave } from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';
import { BsPlusSquare } from 'react-icons/bs';
import Cookies from 'js-cookie';
import faker from 'faker';

import CollapsableNavLinkList from './component/CollapsableNavLinkList/CollapsableNavLinkList';

import UserApi from '../../api/UserApi';

import './Sidebar.scoped.css';

import { filterToUnique } from '../../utils';

function Sidebar () {
    let history = useHistory();
    const [dmToggled, setDmToggled] = useState(false);
    const [channelToggled, setChannelToggled] = useState(false);
    const [directMessageList, setDirectMessageList]  = useState([]);
    const [channelList, setChannelList]  = useState([]);
    const [userToggle, setUserToggle] = useState(false);
    const [userList, setUserList] = useState([]);

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

    useEffect(() => {
       getChannelList();
       getDirectMessages();
       getUserList();
    }, []);

    const handleDmToggle = () => {
        setDmToggled(!dmToggled);
    }
    
    const handleChannelToggle = () => {
        setChannelToggled(!channelToggled);
    }

    const handleUserToggle = () => {
        setUserToggle(!userToggle);
    }

    const setHistory = () => {
        history.push(window.location.pathname);
    }

    const getUserList = async () => {
        await UserApi.all()
            .then(res => setUserList(res.data.data))
            .catch(error => console.log(error.response.data.errors))
        }

    const getChannelList = async () => {
        await UserApi.channels()
          .then(res => setChannelList(res.data.data))
          .catch(error => console.log(error.response.data.errors))
    }

    
    const rearrangeArray = (array) => {
        // set fake images and name
        array.map(item => {
            item.name=faker.fake("{{name.firstName}}");
            item.image=faker.fake("{{image.avatar}}");
        });

        let filteredList = filterToUnique(array);

        filteredList.forEach((item, index) => {
            if (item.uid === Cookies.get('uid')) {
                const current = item

                delete filteredList[index];
                filteredList.splice(0, 0, current);
            } 
        })
        setDirectMessageList(filteredList);
    }
    
    const getDirectMessages = async () => {
        await UserApi.recentMessages()
          .then(res => {
            rearrangeArray(res.data.data)
          })
          .catch(error => console.log(error.response.data.errors))
    }

    return ( 
        <div>
            <nav>
                <NavHeader />
                <NavLink to="/threads" exact onClick={setHistory}>
                    <BiMessageRoundedDetail className="bi-thread-icon" /> Threads
                </NavLink>
                <NavLink to="/all-dms" exact onClick={setHistory}>
                    <TiMessages /> All DMs
                </NavLink>
                <NavLink to="/activity-page" exact onClick={setHistory}>
                    <FaRegSmile /> Mentions & reactions
                </NavLink>
                <NavLink to="/saved-page" exact onClick={setHistory}>
                    <FaRegSave /> Saved items
                </NavLink>
                <NavLink to="/users" exact onClick={setHistory}>
                    <FiUsers /> People & user groups
                </NavLink>
                <div className="more">
                    <BiDotsVerticalRounded className="more-icon" /> More
                </div>
                <div className='wrapper'>
                    <div>
                        <CollapsableNavLinkList 
                            label='Channels' 
                            list={channelList}
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
                            // isToggled={dmToggled} 
                            // handleToggle={handleDmToggle} 
                            list={directMessageList}
                            hasImage={true}
                            hasLabel={true}
                            type='messages'
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
