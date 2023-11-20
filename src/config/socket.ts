import { io } from 'socket.io-client';

export const clientSocket = io('http://localhost:8080');
export const adminSocket = io('http://localhost:8080/admin');
