import API from '../api/base';
import Cookies from 'js-cookie'

const AuthApi = () => {
    
    //checks if data was inserted on to cookies
    const isAuthenticated = () => {
        return Cookies.get('access-token') ? true : false;
    }

    //sends user info to API and sets stores data onto cookies. callback function is used to call isAuthenticated 
    //to make sure data was inserted into cookies. Called on Login.js.
    const authenticate = (email, password, callback) => {
        API.post('/api/v1/auth/sign_in', {
            'email': email,
            'password': password
        }).then(({ data, headers }) => {
            if (data) {
                Cookies.set('access-token', headers['access-token']);
                Cookies.set('client', headers['client']);
                Cookies.set('uid', headers['uid']);
                Cookies.set('expiry', headers['expiry']);
                window.location= '/';
            }
        }).catch(err => {
            callback(err.response.data)
        })
    }

    //logout will remove cookies and redirect user back to the login page
    const logout = () => {
       Cookies.remove('access-token');
       Cookies.remove('client');
       Cookies.remove('uid');
       Cookies.remove('expiry');
       Cookies.remove('userId');
   }

    return {
        isAuthenticated,
        authenticate,
        logout
    }
}

export default AuthApi();
