import * as routes from '../helpers/routes'
import axios from 'axios';

export const login = (email, password) => {
    const data = JSON.stringify({
        email: email,
        password: password,
    });
    const headers = {
        'Content-Type': 'application/json'
    };
    return axios.post(routes.auth, data)
}



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('JwtToken');
}