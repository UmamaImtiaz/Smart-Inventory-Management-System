import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import productsData from './staticProducts';
import './Products.css';
import { FaBoxOpen } from 'react-icons/fa';

const Products = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const uniqueCategories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = productsData
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === 'All' || product.category === categoryFilter)
    )
    .sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'price') return a.price - b.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (productId) => {
    const product = productsData.find(p => p.id === productId);
    const alreadyInCart = cartItems.some(item => item.id === productId);
    if (!alreadyInCart) {
      setCartItems([...cartItems, product]);
    } else {
      alert("Product already in cart!");
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    console.log("Order placed:", cartItems);
    setCartItems([]);
    alert("Order placed successfully!");
    setIsCartOpen(false);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

return (
  <div className="products-page">
    <header className="page-header">
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaBoxOpen style={{ color: '#4a90e2' }} />
        Products
      </h1>
      <div className="cart-status">
        <p>Cart Items: {cartItems.length}</p>
        <p>Favorites: {favorites.length}</p>
        <button className="view-cart-btn" onClick={() => setIsCartOpen(true)}>
          View Cart
        </button>
      </div>
    </header>

      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price (Low to High)</option>
        </select>
      </div>

      {/* Products */}
      <div className="products-grid">
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={currentPage === page ? 'active-page' : ''}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Products;
