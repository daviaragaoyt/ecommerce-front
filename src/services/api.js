import axios from 'axios';

const api = axios.create({
 
  baseURL: 'https://ecommerce-py.vercel.app', // Certifique-se que esta é a URL da sua API
});

export default api;
