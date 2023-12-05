import { io } from 'socket.io-client';

export const clientSocket = io('http://18.167.66.141:8080');
export const adminSocket = io('http://18.167.66.141:8080/admin');
