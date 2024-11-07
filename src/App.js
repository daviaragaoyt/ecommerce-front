import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
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
