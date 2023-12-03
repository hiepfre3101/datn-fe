import { io } from 'socket.io-client';
import { dbUrl } from '../constants/dbUrl';

export const clientSocket = io(dbUrl);
export const adminSocket = io(dbUrl + '/admin');
