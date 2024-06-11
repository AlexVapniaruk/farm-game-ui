import { io } from 'socket.io-client';
import axios from "axios";

let baseUrl;
axios.get('/env')
    .then(response => {
        const envVariables = response.data;
        baseUrl = envVariables.API_URL; // Assuming API_BASE_URL is one of the environment variables
    })
    .catch(error => {
        console.error('Error fetching environment variables:', error);
    });
const socket = io(baseUrl || 'http://localhost:3000');

// Example of setting up event listeners
socket.on('connection', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

export default socket;