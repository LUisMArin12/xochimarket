import React from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';

/**
 * Vista de detalle para un producto seleccionado.
 */
const ProductDetail = ({
  product,
  favorites,
  toggleFavorite,
  goBackToList,
  addToCart
}) => {
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button 
        onClick={goBackToList}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Volver a productos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen y detalles técnicos */}
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full ${
                favorites.has(product.id) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-400 hover:text-red-500'
              } transition-colors duration-200 shadow-lg`}
            >
              <Heart size={24} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <span>SKU:</span>
              <span className="font-mono">{product.sku}</span>
            </div>
            <div className="flex justify-between">
              <span>Stock disponible:</span>
              <span className="font-semibold">{product.stock} unidades</span>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm text-red-600 font-medium">{product.category}</div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="text-sm text-blue-600 font-medium">{product.origin}</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.material}</p>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-lg text-gray-700 ml-2">{product.rating}</span>
              <span className="text-gray-500 ml-2">({product.reviews} reseñas)</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">${product.price.toLocaleString('es-MX')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">${product.originalPrice.toLocaleString('es-MX')}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium">
                    Ahorra ${(product.originalPrice - product.price).toLocaleString('es-MX')}
                  </span>
                </>
              )}
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                {product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </button>

              <button 
                disabled={product.stock === 0}
                className="w-full border-2 border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:text-gray-400 text-gray-700 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Comprar Ahora
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              Esta hermosa pieza de {product.name.toLowerCase()} es elaborada por artesanos mexicanos 
              siguiendo técnicas tradicionales transmitidas de generación en generación. Cada bordado y detalle 
              refleja la rica cultura y tradición de {product.origin}, creando una prenda única 
              que combina autenticidad con elegancia atemporal.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                100% hecho a mano por artesanos mexicanos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                Material: {product.material}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                Origen auténtico: {product.origin}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                Pieza única con variaciones artesanales
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                Apoya el comercio justo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;