import API from './base';

const MessageApi = {
    // send a message to a specific user
    send: (payload) => {
        const options = {
            method: 'POST',
            url: '/api/v1/messages',
            data: payload,
        };

        return API.request(options);
    },
    // fetch messages of a specific user
    retrieve: (params) => {
        const options = {
            method: 'GET',
            url: `/api/v1/messages?${params}`,
        };

        return API.request(options);
    }

}

export default MessageApi;
