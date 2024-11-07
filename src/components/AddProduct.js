// src/components/AddProduct.js
import React, { useState } from 'react';
import api from '../services/api';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/products/add', { name, price, description });
            alert(response.data.message);
            setName('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error("Erro ao adicionar produto", error);

        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Adicionar Produto
                </button>
            </form>
        </div>
    );
}

export default AddProduct;

