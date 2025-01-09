import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [setUpdateProductData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    imageBase64: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        console.log(response.data); // Log dos produtos recebidos
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = async (updatedProduct) => {
    try {
      await api.put(
        `/api/products/update/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setIsUpdating(false);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/products/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto!");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await api.post(`/api/cart/add/${product.id}`);
      alert(`${product.name} adicionado ao carrinho!`);
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar ao carrinho!");
    }
  };

  const getImageSrc = (imageBase64) => {
    if (!imageBase64) return ""; // Caso o campo esteja vazio
    if (!imageBase64.startsWith("data:image")) {
      // Adiciona cabeçalho MIME se necessário
      return `data:image/png;base64,${imageBase64}`;
    }
    return imageBase64;
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Produtos</h2>
      {isUpdating ? (
        <div>Formulário de atualização em construção...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={getImageSrc(product.image_base64)}
                alt={product.name}
                className="w-full h-100 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold mb-4">
                  R${product.price}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
