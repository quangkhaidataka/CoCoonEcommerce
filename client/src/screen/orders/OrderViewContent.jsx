import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OrderViewContent() {
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`/orders/${orderId}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const items = await response.json();
        setOrderItems(items);
        console.log("Fetched Order Items:", items);
      } catch (error) {
        console.error("Failed to fetch order items:", error);
        setError(error);
      }
    };

    if (orderId) {
      fetchOrderItems();
    }
  }, [orderId]);

  if (error) {
    return <div>Error fetching order items: {error.message}</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      {orderItems.length === 0 ? (
        <p>This order is empty</p>
      ) : (
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <h3>Product ID: {item._id}</h3>
              <p>Price: ${item.price}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderViewContent;
