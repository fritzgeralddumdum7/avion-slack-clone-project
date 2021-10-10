import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import faker from 'faker';
import Cookies from 'js-cookie';

import UserApi from '../api/UserApi';

import { filterToUnique } from '../utils';

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers',
    async () => {
        const response = await UserApi.all();

        return response.data.data;
    }
)

export const fetchOwnedChannels = createAsyncThunk('users/fetchOwnedChannels',
    async () => {
        const response = await UserApi.channels()

        return response.data.data;
    }
)

export const fetchRecentMessages = createAsyncThunk('users/fetchRecentMessages',
    async () => {
        const response = await UserApi.recentMessages();

        return response.data.data;
    }
)

// finalize the recent messages / dms
const recentMessageList = (recentMessageList) => {
    let finalRecentMessages = [];
    let filtered = filterToUnique(recentMessageList);

    filtered.forEach((item, index) => {
        if (item.uid === Cookies.get('uid')) {
            delete filtered[index];
            filtered.splice(0, 0, item);
        } 
    })

    filtered.forEach(item => finalRecentMessages.push(setFakeInfo(item)))

    return finalRecentMessages;
}

// setter for fake name and image
const setFakeInfo = (item) => {
    return item = {
        ...item,
        name: faker.fake("{{name.firstName}}"),
        nickname: faker.fake("{{name.lastName}}"),
        image: faker.fake("{{image.avatar}}")
    }
}

const finalizeUsersInfo = (users) => {
    let finalUsers = [];

    users.forEach(item => finalUsers.push(setFakeInfo(item)));

    return finalUsers;
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        ownedChannels: [],
        recentMessages: [],
        isFetchingUsers: false
    },
    extraReducers: {
        [fetchAllUsers.pending]: state => {
            state.isFetchingUsers = true;
        },
        [fetchAllUsers.fulfilled]: (state, action) => {
            state.users = finalizeUsersInfo(action.payload);
            state.isFetchingUsers = false;
        },
        [fetchOwnedChannels.fulfilled]: (state, action) => {
            state.ownedChannels = action.payload;
        },
        [fetchRecentMessages.fulfilled]: (state, action) => {
            state.recentMessages = recentMessageList(action.payload);
        }
    }
})

export default usersSlice.reducer;
