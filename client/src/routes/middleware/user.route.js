import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../../shared/Sidebar/Sidebar';
import Header from '../../shared/Header/Header';
import Disclaimer from '../../shared/Disclaimer/Disclaimer';

import AuthApi from '../../services/AuthApi';

function UserRoutes ({ component: Component, ...rest }) {
    return (
        <div>
            <Disclaimer text='Disclaimer: This app is for educational purposes only.' />
            { AuthApi.isAuthenticated() && <Header /> }
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
