import API from './base';

const UserApi = {
    // registers a new user
    register: (payload) => {
        const options = {
            method: 'POST',
            url: '/api/v1/auth',
            data: payload,
        };

        return API.request(options);
    },
    // fetch the users channels
    channels: () => {
        const options = {
            method: 'GET',
            url: '/api/v1/channels',
        };
    
        return API.request(options);
    },
    // fetch the users recent messages
    recentMessages: () => {
        const options = {
            method: 'GET',
            url: '/api/v1/users/recent',
        }

        return API.request(options);
    },
    // fetch all users
    all: () => {
        const options = {
            method: 'GET',
            url: '/api/v1/users',
        }

        return API.request(options);
    },
    ownedChannels: () => {
        const options = {
            method: 'GET',
            url: '/api/v1/channel/owned',
        }

        return API.request(options);
    }
};

export default UserApi;
