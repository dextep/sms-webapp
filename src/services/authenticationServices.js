import * as routes from '../helpers/routes'
import axios from 'axios';

export const login = (email, password) => {
    const data = JSON.stringify({
        email: email,
        password: password,
    });
    return axios.post(routes.auth, data)
};
