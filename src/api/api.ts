import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f4186cbc99a8.ngrok-free.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default api;

