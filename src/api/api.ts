import axios from 'axios';

const api = axios.create({
  baseURL: 'https://c391ffb9b72c.ngrok-free.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default api;

