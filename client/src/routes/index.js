import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

// components
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ComposeMessage from '../pages/ComposeMessage/ComposeMessage';
import Users from '../pages/Users/Users';
import ChannelMessages from '../pages/ChannelMessages/ChannelMessages';
import UserMessages from '../pages/UserMessages/UserMessages';

import AuthRoute from './middleware/auth.route';
import UserRoutes from './middleware/user.route';
import NotFoundRoute from './middleware/notFound.route';

// for demo components
import UnderConstruction from '../pages/UnderConstruction/UnderConstruction';

const routes = () => {
    return (
        <Switch>
            <AuthRoute path={["/", "/login"]} exact component={Login} />
            <AuthRoute path="/signup" exact component={Registration}/>

            <UserRoutes path="/compose" exact component={ComposeMessage} />
            <UserRoutes path="/users" exact component={Users} />
            <UserRoutes path="/channel/:id(\d+)" exact component={ChannelMessages} />
            <UserRoutes path="/messages/:id(\d+)" exact component={UserMessages} />

            <UserRoutes path="/threads" exact component={UnderConstruction} />
            <UserRoutes path="/all-dms" exact component={UnderConstruction} />
            <UserRoutes path="/activity-page" exact component={UnderConstruction} />
            <UserRoutes path="/saved-page" exact component={UnderConstruction} />
            <NotFoundRoute />
        </Switch>
    );
}

export default withRouter(routes);
