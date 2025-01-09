import React, { useState } from 'react';
import api from '../services/api';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Novo estado para a imagem

    // Função para converter imagem para base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Armazenar a imagem em base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar todos os dados incluindo a imagem em base64
            const response = await api.post('/api/products/add', {
                name,
                price,
                description,
                image_base64: image, // Enviar imagem base64 para o backend
            });
            alert(response.data.message);
            setName('');
            setPrice('');
            setDescription('');
            setImage();
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
                <input
                    type="file"
                    accept="image/*" // Aceitar qualquer tipo de imagem
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                />
                {image && (
                    <div className="mt-4">
                        <img
                            src={image} // Exibe a imagem convertida
                            alt="Pré-visualização"
                            className="w-32 h-32 object-cover rounded"
                        />
                    </div>
                )}
                <button type="submit" className="bg-green-500 text-white p-2 rounded">
                    Adicionar Produto
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
