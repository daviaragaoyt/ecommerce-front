import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Painel do E-commerce</h1>
            <div className="space-y-4">
                <Link to="/products" className="block bg-blue-500 text-white py-2 px-4 rounded">
                    Ver Produtos
                </Link>
                <Link to="/add-product" className="block bg-green-500 text-white py-2 px-4 rounded">
                    Adicionar Produto
                </Link>
                <Link to="/cart" className="block bg-purple-500 text-white py-2 px-4 rounded">
                    Ver Carrinho
                </Link>
            </div>
        </div>
    );
}

export default Home;