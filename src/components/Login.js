import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Importando a biblioteca js-cookie

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia a requisição de login para a API
      const response = await api.post('/login', { username, password });

      // Verifique a resposta da API
      const userData = response.data; // Aqui você pega o JSON da resposta

      // Salvar o JSON completo no cookie (pode ser um objeto, ou apenas campos específicos)
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); // Salva o cookie por 7 dias

      // Define o estado de login no componente pai
      onLogin(true);
      
      // Redireciona para a home após o login bem-sucedido
      navigate('/home'); 
    } catch (error) {
      alert('Credenciais inválidas, chefe!');
      onLogin(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;