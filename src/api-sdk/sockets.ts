import { io } from 'socket.io-client';
import axios from "axios";
import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router.ts";

let socket;
axios.get('/env')
    .then(response => {
        console.log('response /env')
        const envVariables = response.data;
        console.log(envVariables)
        //@ts-ignore
        window.__env__ = envVariables; // Set environment variables on window object
        //@ts-ignore
        const socket = io(window.__env__.API_URL || 'http://localhost:3000');
    })
    .catch(error => {
        console.error('Error fetching environment variables:', error);
        // Handle error if needed
    });

// Example of setting up event listeners
socket.on('connection', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

export default socket;