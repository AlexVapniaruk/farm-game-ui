import axios from 'axios';

let baseUrl;
axios.get('/env')
    .then(response => {
        const envVariables = response.data;
        console.log(envVariables, 'envVARIS')
        baseUrl = envVariables.API_BASE_URL; // Assuming API_BASE_URL is one of the environment variables
    })
    .catch(error => {
        console.error('Error fetching environment variables:', error);
    });

// Create Axios instance after fetching environment variables
const instance = axios.create({
    baseURL: baseUrl, // Use the retrieved base URL
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;