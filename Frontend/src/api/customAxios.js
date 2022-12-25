import axios from 'axios'
const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000"

const basicAxios = axios.create({
    baseURL: baseURL
});

const authAxios = axios.create({
    baseURL: baseURL
})

authAxios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token') || ""}`;
        return config;
    },
    error => {
        throw new Error(error?.message || "error occured while making request")
    }
);

export { basicAxios, authAxios }