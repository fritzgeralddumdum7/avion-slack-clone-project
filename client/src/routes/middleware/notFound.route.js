import React from 'react';
import { Route } from 'react-router-dom';

import PageNotFound from '../../pages/PageNotFound/PageNotFound';

const NotFoundRoute = ({ location: { state } }) => {
  return (
    <Route path="*" component={() => {
        return (
            <div>
                <PageNotFound />
            </div>
        );
        }}
    />
  );
};

export default NotFoundRoute;
