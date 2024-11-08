// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCartPlus } from '@fortawesome/free-solid-svg-icons';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateProductData, setUpdateProductData] = useState({ id: null, name: '', price: '', description: '' });

    // Função para carregar produtos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            }
        };
        fetchProducts();
    }, []);

    // Função para deletar produto
    const deleteProduct = async (productId) => {
        try {
            await api.delete(`/api/products/delete/ ${productId}`);
            setProducts(products.filter(product => product.id !== productId));
            alert("Produto deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar produto", error);
        }
    };

    // Função para adicionar ao carrinho
    const addToCart = async (productId) => {
        try {
            await api.post(`/api/cart/add/${productId}`);
            alert("Produto adicionado ao carrinho!");
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho", error);
        }
    };

    // Função para atualizar produto
    const updateProduct = async () => {
        try {
            await api.put(`/api/products/update/${updateProductData.id}`, updateProductData);
            setProducts(products.map(product => 
                product.id === updateProductData.id ? updateProductData : product
            ));
            alert("Produto atualizado com sucesso!");
            setIsUpdating(false);
        } catch (error) {
            console.error("Erro ao atualizar produto", error);
        }
    };

    // Renderiza o formulário de atualização se estiver em modo de atualização
    const renderUpdateForm = () => (
        <div>
            <h3>Atualizar Produto</h3>
            <input
                type="text"
                value={updateProductData.name}
                onChange={(e) => setUpdateProductData({ ...updateProductData, name: e.target.value })}
                placeholder="Nome"
            />
            <input
                type="number"
                value={updateProductData.price}
                onChange={(e) => setUpdateProductData({ ...updateProductData, price: e.target.value })}
                placeholder="Preço"
            />
            <textarea
                value={updateProductData.description}
                onChange={(e) => setUpdateProductData({ ...updateProductData, description: e.target.value })}
                placeholder="Descrição"
            ></textarea>
            <button onClick={updateProduct}>Salvar Alterações</button>
            <button onClick={() => setIsUpdating(false)}>Cancelar</button>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Lista de Produtos</h2>
            {isUpdating ? renderUpdateForm() : (
                <ul className="space-y-4">
                    {products.map((product) => (
                        <li key={product.id} className="bg-white p-4 rounded shadow">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p>Preço: R$ {product.price}</p>
                            <p>Descrição: {product.description}</p>
                            <div className="flex space-x-4 mt-4">
                                <button onClick={() => deleteProduct(product.id)} className="text-red-500">
                                    <FontAwesomeIcon icon={faTrash} /> Deletar
                                </button>
                                <button
                                    onClick={() => {
                                        setIsUpdating(true);
                                        setUpdateProductData(product);
                                    }}
                                    className="text-blue-500"
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Atualizar
                                </button>
                                <button onClick={() => addToCart(product.id)} className="text-green-500">
                                    <FontAwesomeIcon icon={faCartPlus} /> Adicionar ao Carrinho
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;
