import API from './base';

const ChannelApi = {
    // creates new channel
    create: (payload) => {
        const options = {
            method: 'POST',
            url: '/api/v1/channels',
            data: payload,
        };

        return API.request(options);
    },
    // fetch the details of a channel
    details: (id) => {
        const options = {
            method: 'GET',
            url: `/api/v1/channels/${id}`,
        }

        return API.request(options);
    },
    // fetch the members the belongs to a channel
    members: (payload) => { 
        const options = {
            method: 'POST',
            url: '/api/v1/channel/add_member',
            data:payload,
        }
        
        return API.request(options);
    }
};

export default ChannelApi;
