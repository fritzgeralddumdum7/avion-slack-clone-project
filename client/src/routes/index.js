import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

// components
import App from '../App';
import Login from '../pages/Login/Login';
import Shared from '../pages/Shared/Shared';
import Registration from '../pages/Registration/Registration';
import ComposeMessage from '../pages/ComposeMessage/ComposeMessage';
import Users from '../pages/Users/Users';
import CreateChannel from '../pages/CreateChannel/CreateChannel';
import ChannelMessages from '../pages/ChannelMessages/ChannelMessages';
import UserMessages from '../pages/UserMessages/UserMessages';
import ChannelMemberList from '../shared/ChannelMemberList/ChannelMembersList';

import AuthRoute from './middleware/auth.route';
import UserRoutes from './middleware/user.route';

// for demo components
import UnderConstruction from '../pages/UnderConstruction/UnderConstruction';

const routes = () => {
    return (
        <Switch>
            <AuthRoute path={["/", "/login"]} exact component={Login} />
            <AuthRoute path="/signup" exact component={Registration}/>

            <UserRoutes path="/temporary" exact component={App} />
            <UserRoutes path="/messages/:receiverId" exact component={UserMessages} />
            <UserRoutes path="/shared" exact component={Shared} />
            <UserRoutes path="/compose" exact component={ComposeMessage} />
            <UserRoutes path="/createchannel" exact component={CreateChannel} />
            <UserRoutes path="/users" exact component={Users} />
            <UserRoutes path="/channel/:channelId" exact component={ChannelMessages} />

            <UserRoutes path="/threads" exact component={UnderConstruction} />
            <UserRoutes path="/all-dms" exact component={UnderConstruction} />
            <UserRoutes path="/activity-page" exact component={UnderConstruction} />
            <UserRoutes path="/saved-page" exact component={UnderConstruction} />
        </Switch>
    );
}

export default withRouter(routes);
