import axios from 'axios';

// Create Axios instance after fetching environment variables
const instance = axios.create({
    //@ts-ignore
    baseURL: window.__env__.API_URL, // Use the retrieved base URL
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;