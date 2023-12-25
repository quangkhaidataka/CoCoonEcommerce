import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderContent() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = (id) => {
    navigate(`/orders/${id}`);
  };

  if (isLoading) return <div className="text-center mt-5"><p>Loading orders...</p></div>;

  return (
    <div className="container mt-3">
      <h2 className="mb-4 text-center">All Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders.</p>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="row justify-content-center">
            {orders.map((order) => (
              <div className="col-12 col-md-8" key={order._id}> {/* Adjusted for centering */}
                <div className="card mb-3 mx-auto" style={{ width: '700px', height:'240px'}}> {/* mx-auto centers the card */}
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      {/* Placeholder for image. Replace '...' with your image path */}
                      <img src="https://as1.ftcdn.net/v2/jpg/01/26/41/46/1000_F_126414604_ujuJ6z4dMYPWopEg1vzGW9uU5eeXXdlI.jpg" className="img-fluid rounded-start" alt="Order" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{formatDate(order.orderDate)}</h5>
                        <p className="card-text">Total Price: ${order.totalPrice}</p>
                        <p className="card-text">Status: Delivered</p>


                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleClick(order._id)}>
                          View My Order
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderContent;
