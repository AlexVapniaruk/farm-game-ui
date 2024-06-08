import { io } from 'socket.io-client';

const socket = io(import.meta.env.API_BASE_URL || 'http://localhost:3000');

// Example of setting up event listeners
socket.on('connection', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

export default socket;