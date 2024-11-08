import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Certifique-se que esta é a URL da sua API
});

export default api;
