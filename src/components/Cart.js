// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await api.get('/api/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error("Erro ao buscar carrinho", error);
            }
        };
        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            const response = await api.post('/api/cart');
            alert(response.data.message);
            setCartItems([]);
        } catch (error) {
            console.error("Erro ao finalizar compra", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Carrinho de Compras</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-xl font-bold">{item.produc_name}</h3>
                        <p>Preço: R$ {item.product_price}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded mt-4">
                Finalizar Compra
            </button>
        </div>
    );
}

export default Cart;
