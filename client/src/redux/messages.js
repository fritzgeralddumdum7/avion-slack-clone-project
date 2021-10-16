import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import faker from 'faker';
import Cookies from 'js-cookie';
import moment from 'moment';

import MessageApi from '../api/MessageApi';

import { setFakeInfo } from '../utils';

export const fetchConversation = createAsyncThunk('messages/fetchConversation',
    async ({ type, id }) => {
        const response = await MessageApi.retrieve(type, id);

        return response.data.data;
    }
)

export const messages = createSlice({
    name: 'messages',
    initialState: {
        conversation: [],
        isFetchingMessages: false,
        recipient: null,
        sender: null
    },
    reducers: {
        setConversation: (state, action) => {
            const convoLastIndex = state.conversation.length - 1;
            const lastMessageIndex = state.conversation[convoLastIndex].convos.length - 1;
            const isPreviousRecipient = state.conversation[convoLastIndex].convos[lastMessageIndex].sender === action.payload.sender;

            if (isPreviousRecipient) {
                state.conversation[convoLastIndex].convos[lastMessageIndex].body = [
                    ...state.conversation[convoLastIndex].convos[lastMessageIndex].body, 
                    action.payload.body[0]
                ]
            } else {
                state.conversation[state.conversation.length - 1].convos = [
                    ...state.conversation[state.conversation.length - 1].convos, 
                    action.payload
                ]
            }
        }
    },
    extraReducers: {
        [fetchConversation.pending]: state => {
            state.isFetchingMessages = true;
        },
        [fetchConversation.fulfilled]: (state, action) => {
            const result = setFakeInfo(action.payload, moment, faker, Cookies);

            state.conversation = result.messages;
            state.recipient = result.recipient;
            state.sender = result.sender;
            state.isFetchingMessages = false;
        }
    }
})

export const { setConversation } = messages.actions;

export default messages.reducer;
