import React from 'react';
import './ProductCard.css'; // Optional: separate CSS

const ProductCard = ({ product, onAddToCart, isFavorite, onToggleFavorite }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <div className="actions">
          <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
          <button
            className={isFavorite ? 'favorite active' : 'favorite'}
            onClick={() => onToggleFavorite(product.id)}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
