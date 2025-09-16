import React, { useState } from 'react';
import './CartDrawer.css';

const PaymentMethod = ({ onSuccess, onBack, className = '' }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .substring(0, 19);
  };

  const validateForm = () => {
    if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/ /g, ''))) {
      setError('Invalid card number');
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      setError('Invalid expiry date (MM/YY)');
      return false;
    }
    if (!/^\d{3}$/.test(cardDetails.cvc)) {
      setError('Invalid CVC');
      return false;
    }
    if (cardDetails.cardholderName.trim().length < 3) {
      setError('Cardholder name required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Payment method added successfully!');
      setCardDetails({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardholderName: ''
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Failed to add payment method');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`payment-container ${className}`}>
      {onBack && (
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Cart
        </button>
      )}
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formatCardNumber(cardDetails.cardNumber)}
            onChange={(e) => {
              e.target.value = formatCardNumber(e.target.value);
              handleInputChange(e);
            }}
            placeholder="4242 4242 4242 4242"
            maxLength="19"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={(e) => {
                let value = e.target.value;
                if (/\D$/.test(value)) value = value.slice(0, -1);
                if (value.length === 2 && !value.includes('/')) {
                  value += '/';
                }
                e.target.value = value.substring(0, 5);
                handleInputChange(e);
              }}
              placeholder="MM/YY"
            />
          </div>

          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              name="cvc"
              value={cardDetails.cvc}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
                handleInputChange(e);
              }}
              placeholder="123"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={cardDetails.cardholderName}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Add Payment Method'}
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;