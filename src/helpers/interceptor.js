import axios from 'axios'
import * as routes from "./routes";

function interceptor (){

    // Request
    axios.interceptors.request.use(
        (config) => {
            config.headers['Content-Type'] = 'application/json'
            const token = localStorage.getItem('JwtToken');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Response
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {

            // return error
            // // token expired
            // if (error.response.status === 401) {
            //     localStorage.removeItem('JwtToken');
            //     history.push("/signIn");
            //     window.location.reload(true);
            // }
            return Promise.reject(error)
        }
    )

}
export default interceptor