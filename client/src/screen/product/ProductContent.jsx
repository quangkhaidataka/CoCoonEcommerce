import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productcontent.css';
import Content from './Content';
import { useNavigate } from 'react-router-dom';


function ProductContent(props) {

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    const newPost = { id: props.id };
    try {
      const response = await fetch('/addcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Navigate to a new route after successful POST
      navigate('/cart'); // Replace with your desired path

    } catch (error) {
      console.error('Failed to submit new post:', error);
    }
  };

  return (
    <div className="contentproduct">
      <div className="row">
        <div className="col-lg-6">
          <div className="border rounded">
            <a>
              <img src={props.thumbnail} className="img-fluid rounded" alt="Product" />
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="fw-bold mb-3">{props.name}</h4>
          <p className="mb-3">Category: Vegetables</p>
          <h5 className="fw-bold mb-3">${props.price}</h5>
          <div className="d-flex mb-4">
            {/* FontAwesome icons here */}
          </div>
          <Content content={props.description} />

          <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={handleClick}>
            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
          </button>

          <a href={`/edit/${props.id}`} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
            <i className="fa fa-shopping-bag me-2 text-primary"></i> View Info
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
