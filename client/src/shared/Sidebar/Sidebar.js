import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';
import Cookies from 'js-cookie';
import faker from 'faker';
import CollapsableNavLinkList from './component/CollapsableNavLinkList/CollapsableNavLinkList';
import UserApi from '../../api/UserApi';
import { TiMessages, TiMessage } from 'react-icons/ti';
import {FiUsers} from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';

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
        console.log(channelList);
    }

    const handleUserToggle = () => {
        setUserToggle(!userToggle);
    }

    const setHistory = () => {
        history.push(window.location.pathname);
    }

    const getUserList = async () => {
        await UserApi.all()
            .then(res => setUserList(res.data.data)
            )
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
                <NavLink to="/" exact onClick={setHistory}>
                    <TiMessage /> Threads
                </NavLink>
                <NavLink to="/shared" exact onClick={setHistory}>
                    <TiMessages /> All DMs
                </NavLink>
                <NavLink to="/users" exact onClick={setHistory}>
                    <FiUsers /> People & user groups
                </NavLink>
             
                <div className='wrapper'>
                    <div className='divider-component'>
                        <CollapsableNavLinkList 
                            label='Channels' 
                            isToggled={channelToggled} 
                            handleToggle={handleChannelToggle} 
                            list={channelList}
                        />
                    </div>
                    <div className='divider-component'>
                        <CollapsableNavLinkList 
                            label='Direct Messages' 
                            isToggled={dmToggled} 
                            handleToggle={handleDmToggle} 
                            list={directMessageList}
                            hasImage={true}
                            hasLabel={true}
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
