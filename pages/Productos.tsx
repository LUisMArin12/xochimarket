import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, ArrowLeft, Loader } from 'lucide-react';

const ProductsApp = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // Simulación de API Backend
  const API_BASE = 'https://api.ropamexicana.com/v1';
  
  // Datos de productos simulados
  const mockProducts = [
    {
      id: 1,
      name: 'Huipil Bordado de Oaxaca',
      price: 1250.00,
      originalPrice: 1450.00,
      image: 'https://images.unsplash.com/photo-1594736797933-d0200ba5fb51?w=400',
      rating: 4.9,
      reviews: 87,
      category: 'Huipiles',
      origin: 'Oaxaca',
      material: 'Algodón bordado a mano',
      stock: 15,
      sku: 'HUI-OAX-001'
    },
    {
      id: 2,
      name: 'Rebozo de Santa María',
      price: 890.00,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rating: 4.7,
      reviews: 64,
      category: 'Rebozos',
      origin: 'Michoacán',
      material: 'Seda natural',
      stock: 8,
      sku: 'REB-MIC-002'
    },
    {
      id: 3,
      name: 'Camisa Guayabera Yucateca',
      price: 680.00,
      originalPrice: 780.00,
      image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400',
      rating: 4.8,
      reviews: 103,
      category: 'Guayaberas',
      origin: 'Yucatán',
      material: 'Lino bordado',
      stock: 23,
      sku: 'GUA-YUC-003'
    },
    {
      id: 4,
      name: 'Falda Tehuana Tradicional',
      price: 1580.00,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      rating: 4.6,
      reviews: 45,
      category: 'Faldas',
      origin: 'Istmo de Tehuantepec',
      material: 'Terciopelo con flores bordadas',
      stock: 5,
      sku: 'FAL-TEH-004'
    },
    {
      id: 5,
      name: 'Poncho de Saltillo',
      price: 950.00,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
      rating: 4.5,
      reviews: 72,
      category: 'Ponchos',
      origin: 'Coahuila',
      material: 'Lana virgen tejida',
      stock: 12,
      sku: 'PON-COA-005'
    },
    {
      id: 6,
      name: 'Vestido Poblana Bordado',
      price: 1320.00,
      originalPrice: 1520.00,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      rating: 4.9,
      reviews: 91,
      category: 'Vestidos',
      origin: 'Puebla',
      material: 'Manta bordada con hilo de colores',
      stock: 18,
      sku: 'VES-PUE-006'
    }
  ];

  // Simulación de llamadas API
  const apiCall = async (endpoint, options = {}) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));
    
    console.log(`API Call: ${endpoint}`, options);
    
    switch (endpoint) {
      case '/products':
        return { data: mockProducts, status: 'success' };
      case '/favorites':
        return { data: Array.from(favorites), status: 'success' };
      case '/cart':
        return { data: cartItems, status: 'success' };
      default:
        return { data: null, status: 'success' };
    }
  };

  // Cargar productos al iniciar
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await apiCall('/products');
        if (response.status === 'success') {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Cargar favoritos del usuario
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await apiCall('/favorites');
        if (response.status === 'success') {
          setFavorites(new Set(response.data));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (productId) => {
    try {
      const newFavorites = new Set(favorites);
      const action = newFavorites.has(productId) ? 'remove' : 'add';
      
      if (action === 'remove') {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      
      // Actualizar UI inmediatamente
      setFavorites(newFavorites);
      
      // Enviar al backend
      await apiCall(`/favorites/${productId}`, {
        method: action === 'add' ? 'POST' : 'DELETE',
        body: JSON.stringify({ productId, userId: 'user_123' })
      });
      
    } catch (error) {
      console.error('Error updating favorite:', error);
      // Revertir cambio en caso de error
      setFavorites(prev => {
        const reverted = new Set(prev);
        if (reverted.has(productId)) {
          reverted.delete(productId);
        } else {
          reverted.add(productId);
        }
        return reverted;
      });
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
          userId: 'user_123'
        })
      });
      
      if (response.status === 'success') {
        setCartItems(prev => [...prev, { ...product, quantity }]);
        console.log(`Added ${product.name} to cart`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const showProductDetail = async (product) => {
    try {
      // Obtener detalles completos del producto
      const response = await apiCall(`/products/${product.id}`);
      if (response.status === 'success') {
        setSelectedProduct(product);
        setCurrentView('detail');
      }
    } catch (error) {
      console.error('Error loading product details:', error);
      // Mostrar con datos básicos si falla
      setSelectedProduct(product);
      setCurrentView('detail');
    }
  };

  const goBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-red-600" size={48} />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Vista de Lista de Productos
  const ProductList = () => (
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
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                </div>
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

  // Vista de Detalle del Producto
  const ProductDetail = () => (
    <div className="max-w-6xl mx-auto p-6">
      <button 
        onClick={goBackToList}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Volver a productos
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen del producto */}
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <button
              onClick={() => toggleFavorite(selectedProduct.id)}
              className={`absolute top-4 right-4 p-3 rounded-full ${
                favorites.has(selectedProduct.id) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-400 hover:text-red-500'
              } transition-colors duration-200 shadow-lg`}
            >
              <Heart size={24} fill={favorites.has(selectedProduct.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between mb-1">
              <span>SKU:</span>
              <span className="font-mono">{selectedProduct.sku}</span>
            </div>
            <div className="flex justify-between">
              <span>Stock disponible:</span>
              <span className="font-semibold">{selectedProduct.stock} unidades</span>
            </div>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm text-red-600 font-medium">{selectedProduct.category}</div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="text-sm text-blue-600 font-medium">{selectedProduct.origin}</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600 mb-4">{selectedProduct.material}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-lg text-gray-700 ml-2">{selectedProduct.rating}</span>
                <span className="text-gray-500 ml-2">({selectedProduct.reviews} reseñas)</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">${selectedProduct.price.toLocaleString('es-MX')}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">${selectedProduct.originalPrice.toLocaleString('es-MX')}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium">
                    Ahorra ${(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('es-MX')}
                  </span>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => addToCart(selectedProduct)}
                disabled={selectedProduct.stock === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                {selectedProduct.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
              </button>
              
              <button 
                disabled={selectedProduct.stock === 0}
                className="w-full border-2 border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:text-gray-400 text-gray-700 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              Esta hermosa pieza de {selectedProduct.name.toLowerCase()} es elaborada por artesanos mexicanos 
              siguiendo técnicas tradicionales transmitidas de generación en generación. Cada bordado y detalle 
              refleja la rica cultura y tradición de {selectedProduct.origin}, creando una prenda única 
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
                Material: {selectedProduct.material}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                Origen auténtico: {selectedProduct.origin}
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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'list' ? <ProductList /> : <ProductDetail />}
    </div>
  );
};

export default ProductsApp;