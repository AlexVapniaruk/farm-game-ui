import { io } from 'socket.io-client';

//@ts-ignore
const socket = io(window.__env__.API_URL || 'http://localhost:3000');

// Example of setting up event listeners
socket.on('connection', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

export default socket;