import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-py.vercel.app',
});

export default api;
