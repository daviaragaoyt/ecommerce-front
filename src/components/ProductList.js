// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        console.log('Buscando produtos', products)
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Produtos</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{product['name:']}</h3>
            <p>Preço: R$ {product['price:']}</p>
            <p>Descrição: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
