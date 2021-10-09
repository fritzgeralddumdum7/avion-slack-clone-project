import React, { useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import faker from 'faker';

import Sidebar from '../../shared/Sidebar/Sidebar';
import Header from '../../shared/Header/Header';
import Disclaimer from '../../shared/Disclaimer/Disclaimer';

import AuthApi from '../../services/AuthApi';

function UserRoutes ({ component: Component, ...rest }) {
    const userRef = useRef({
        image: faker.fake("{{image.avatar}}")
    })

    return (
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
    )
}

export default UserRoutes;
