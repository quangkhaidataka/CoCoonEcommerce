import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


function CartContent() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/cart');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    const newItems = { cartitems: cartItems };
    try {
      const response = await fetch('/addorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItems),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate('/orders'); // Navigate after successful POST
    } catch (error) {
      console.error('Failed to submit new post:', error);
    }
  };

  return (
    <div className="container mt-3 ">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div className="card mb-3 d-flex justify-content-center align-items-center" style={{maxWidth: "800px"}} key={item.productId._id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.productId.thumbnail} className="img-fluid rounded-start" alt={item.productId.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.productId.name}</h5>
                  <p className="card-text">Price: ${item.productId.price}</p>
                  {/* You can add additional content here such as quantity or remove item button */}
                  <p className="card-text">
                    <small className="text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.productId.description) }}></small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <button className="btn btn-primary rounded-pill px-4 py-2" onClick={handleClick}>
        <i className="fas fa-shopping-cart me-2"></i> Check Out
      </button>
    </div>
  );
}

export default CartContent;
