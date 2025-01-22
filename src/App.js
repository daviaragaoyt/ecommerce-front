import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Home from './components/Home';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica o cookie para manter o estado de login ao recarregar
  useEffect(() => {
    const userData = Cookies.get('userData');
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    Cookies.remove('userData'); // Remove o cookie
    setIsLoggedIn(false); // Atualiza o estado
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={isLoggedIn ? <ProductList /> : <Navigate to="/" />}
        />
        <Route
          path="/add-product"
          element={isLoggedIn ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
