import React, { useState } from 'react';
import PaymentMethod from './PaymentMethod';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, cartItems, onClose, onPlaceOrder, onRemoveItem }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty. Add items to proceed.');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onPlaceOrder();
    onClose();
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <h2>{showPayment ? 'Add Payment Method' : 'Your Cart'}</h2>
        <button onClick={onClose}>✕</button>
      </div>

      {showPayment ? (
        <PaymentMethod onSuccess={handlePaymentSuccess} onBack={() => setShowPayment(false)} />
      ) : cartItems.length === 0 ? (
        <p className="empty-cart">Cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
              <button onClick={() => onRemoveItem(index)} className="remove-btn">Remove</button>
            </li>
          ))}
        </ul>
      )}

      {!showPayment && (
        <div className="checkout-footer">
          <button onClick={handlePlaceOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;