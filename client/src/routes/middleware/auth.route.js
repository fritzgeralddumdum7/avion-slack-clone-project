import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthApi from '../../services/AuthApi';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!AuthApi.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: '/compose',
              state: {
                from: props.location
              }
            }
          } />;
        }
      }}
    />
  );
};

export default AuthRoute;
