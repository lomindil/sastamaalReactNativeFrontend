import axios from 'axios';

const api = axios.create({
  baseURL: 'https://8b552e2731de.ngrok-free.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default api;

