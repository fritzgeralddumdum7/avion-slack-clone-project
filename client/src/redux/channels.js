import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ChannelApi from '../api/ChannelApi';

export const fetchChannelInfo = createAsyncThunk('channels/fetchChannelInfo',
    async ({ id }) => {
        const response = await ChannelApi.details(id);

        return response.data.data;
    }
)

export const channels = createSlice({
    name: 'channels',
    initialState: {
        channelInfo: {},
        memberList: [],
        isFetchingChannel: false
    },
    extraReducers: {
        [fetchChannelInfo.pending]: state => {
            state.isFetchingChannel = true;
        },
        [fetchChannelInfo.fulfilled]: (state, action) => {
            state.channelInfo = action.payload;
            state.isFetchingChannel = false;
        }
    }
})

export default channels.reducer;
