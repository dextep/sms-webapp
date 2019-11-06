import * as routes from '../helpers/routes'
import { handleResponse } from '../helpers/handleResponse'
import * as api from '../helpers/delete_api'
import jwt from 'jsonwebtoken'
import { setAuthToken } from "../helpers/setAuthToken";
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
        // .then(handleResponse)



}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('JwtToken');
}





// return fetch(routes.auth, {
//         method: 'POST',
//         headers: headers,
//         body: data,
//     })
//     .then(handleResponse)
//     .then( token => {
//             localStorage.setItem('JwtToken', token.JwtToken );
//             setAuthToken(localStorage.JwtToken);
//             return token
//         }
//     )