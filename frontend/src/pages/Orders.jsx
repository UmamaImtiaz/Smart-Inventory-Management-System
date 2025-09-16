import { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:6087/api/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>Placed Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} – ${item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
