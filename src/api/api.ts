import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sastamaal-alb-2070074636.us-east-2.elb.amazonaws.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default api;

