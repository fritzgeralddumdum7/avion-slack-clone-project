import axios from 'axios';
import Cookies from 'js-cookie';

// axios header init to access api
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'access-token': Cookies.get('access-token'),
    'client': Cookies.get('client'),
    'expiry': Cookies.get('expiry'),
    'uid': Cookies.get('uid')
  }
});

export default API;
