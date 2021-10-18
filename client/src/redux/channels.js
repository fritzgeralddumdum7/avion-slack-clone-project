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
        isFetchingChannel: false,
        hasError: false
    },
    reducers: {
        setHasError: (state, action) => {
            state.hasError = action.payload;
        }
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

export const { setHasError } = channels.actions;

export default channels.reducer;
