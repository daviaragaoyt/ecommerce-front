import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product['id:']} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{product['name:']}</h2>
            <p className="text-gray-700 mb-2">Price: R$ {product['price:']}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
