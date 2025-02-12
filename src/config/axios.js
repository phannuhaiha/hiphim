import axios from "axios";

axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://huylab.click/api/'

export default axios;
