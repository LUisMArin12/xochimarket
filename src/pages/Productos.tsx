import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import ProductList from '../components/ProductsList';
import ProductDetail from '../components/ProductDetail';

/**
 * Componente principal de la aplicación de productos.
 */
const ProductsApp = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const API_BASE = 'https://api.ropamexicana.com/v1';

  const mockProducts = [...]; // << CORTADO POR ESPACIO >>

  const apiCall = async (endpoint, options = {}) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));
    switch (endpoint) {
      case '/products': return { data: mockProducts, status: 'success' };
      case '/favorites': return { data: Array.from(favorites), status: 'success' };
      case '/cart': return { data: cartItems, status: 'success' };
      default: return { data: null, status: 'success' };
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const response = await apiCall('/products');
      if (response.status === 'success') setProducts(response.data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      const response = await apiCall('/favorites');
      if (response.status === 'success') setFavorites(new Set(response.data));
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (productId) => {
    const newFavorites = new Set(favorites);
    const action = newFavorites.has(productId) ? 'remove' : 'add';
    if (action === 'remove') newFavorites.delete(productId);
    else newFavorites.add(productId);
    setFavorites(newFavorites);
    try {
      await apiCall(`/favorites/${productId}`, {
        method: action === 'add' ? 'POST' : 'DELETE',
        body: JSON.stringify({ productId, userId: 'user_123' })
      });
    } catch (error) {
      setFavorites(prev => {
        const reverted = new Set(prev);
        if (reverted.has(productId)) reverted.delete(productId);
        else reverted.add(productId);
        return reverted;
      });
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const response = await apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id, quantity, userId: 'user_123' })
    });
    if (response.status === 'success') setCartItems(prev => [...prev, { ...product, quantity }]);
  };

  const showProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const goBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'list' ? (
        <ProductList
          products={products}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
          showProductDetail={showProductDetail}
        />
      ) : (
        <ProductDetail
          product={selectedProduct}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          goBackToList={goBackToList}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductsApp;
