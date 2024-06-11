import axios from 'axios';

const instance = axios.create({
    //@ts-ignore
    baseURL: process.env.VITE_API_BASE_URL, // Access environment variable
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;