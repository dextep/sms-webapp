import axios from 'axios'

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

            return Promise.reject(error)
        }
    )

}
export default interceptor