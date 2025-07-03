import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

/**
 * Muestra una lista de productos con interacción para favoritos y carrito.
 */
const ProductList = ({ products, favorites, toggleFavorite, addToCart, showProductDetail }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ropa Tradicional Mexicana</h1>
        <p className="text-gray-600">Auténticas piezas artesanales hechas a mano por maestros artesanos</p>
        <div className="mt-2 text-sm text-gray-500">
          {products.length} productos disponibles
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => showProductDetail(product)}
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full ${
                  favorites.has(product.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-400 hover:text-red-500'
                } transition-colors duration-200`}
              >
                <Heart size={20} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
              </button>
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                  Oferta
                </span>
              )}
              {product.stock < 10 && (
                <span className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs">
                  Solo {product.stock} disponibles
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-500">{product.category}</div>
                <div className="text-xs text-blue-600 font-medium">{product.origin}</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              <div className="text-xs text-gray-500 mb-2">{product.material}</div>

              <div className="flex items-center mb-2">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString('es-MX')}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;