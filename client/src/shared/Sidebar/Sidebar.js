import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';
import Cookies from 'js-cookie';
import faker from 'faker';

import DirectMessageList from './component/DirectMessageList';
import UserApi from '../../api/UserApi';

import { TiMessages, TiMessage } from 'react-icons/ti';
import { IoCreateOutline } from 'react-icons/io5';

import './Sidebar.scoped.css';

import { filterToUnique } from '../../utils';

function Sidebar () {
    let history = useHistory();
    const [isToggled, setIsToggled] = useState(false);
    const [directMessageList, setDirectMessageList]  = useState([]);

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
       getDirectMessages();
    }, []);

    const handleToggling = () => {
        setIsToggled(!isToggled);
    }

    const setHistory = () => {
        history.push(window.location.pathname);
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
            } else {

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
                <div className="parent-navlink">
                    <div className="d-flex align-middle parent-navlink-item" onClick={handleToggling}>
                        { !isToggled ? 
                            <VscTriangleRight className="vsc-triangle" /> :
                            <VscTriangleDown className="vsc-triangle" />
                        }
                        Direct Messages
                    </div>
                    { isToggled &&
                        <DirectMessageList list={directMessageList} />
                    }
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
