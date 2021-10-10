import React, { useRef, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import faker from 'faker';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../../shared/Sidebar/Sidebar';
import Header from '../../shared/Header/Header';
import Disclaimer from '../../shared/Disclaimer/Disclaimer';
import Loader from '../../shared/Loader/Loader';

import AuthApi from '../../services/AuthApi';

import { 
    fetchAllUsers,
    fetchRecentMessages,
    fetchOwnedChannels
} from '../../redux/users';

function UserRoutes ({ component: Component, ...rest }) {
    const dispatch = useDispatch();
    const { isFetchingUsers } = useSelector(state => state.users);
    const userRef = useRef({
        image: faker.fake("{{image.avatar}}")
    })

    // dispatches all fetch api
    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchOwnedChannels());
        dispatch(fetchRecentMessages());
    }, [])

    return (
        <div>
            { 
                isFetchingUsers 
                    ? <Loader /> : 
                    <div>
                        <Disclaimer text='Disclaimer: This app is for educational purposes only.' />
                        { AuthApi.isAuthenticated() && <Header image={userRef.current.image} /> }
                        <div className="d-flex">
                            { AuthApi.isAuthenticated() && <Sidebar /> }
                            <Route
                                {...rest}
                                render={(props) => {
                                    if (AuthApi.isAuthenticated()) {
                                        return <Component {...props} />;
                                    } else {
                                        return <Redirect to={
                                            {
                                                pathname: '/login',
                                                state: {
                                                    from: props.location
                                                }
                                            }
                                        } />;
                                    }
                                }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserRoutes;
