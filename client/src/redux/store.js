import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users';
import messagesReducer from './messages';
import channelsReducer from './channels';

export default configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
    channels: channelsReducer
  }
})
