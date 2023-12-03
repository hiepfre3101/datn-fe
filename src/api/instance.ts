import axios from 'axios';
import { dbUrl } from '../constants/dbUrl';

const instance = axios.create({
   baseURL: dbUrl + '/api',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
   }
});

export default instance;
