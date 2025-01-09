import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Certifique-se que esta é a URL da sua API
});

export default api;