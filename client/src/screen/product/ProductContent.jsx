import React from 'react';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import './productcontent.css'
import Content from './Content'


function ProductContent(props) {
  return (

    <div className = "contentproduct">
      <div className="row">
        <div className="col-lg-6">
          <div className="border rounded">
            <a href="#">
              <img src={props.thumbnail} className="img-fluid rounded" alt="Image" />
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="fw-bold mb-3">{props.name}</h4>
          <p className="mb-3">Category: Vegetables</p>
          <h5 className="fw-bold mb-3">${props.price}</h5>
          <div className="d-flex mb-4">
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star text-secondary"></i>
            <i className="fa fa-star"></i>
          </div>
          <Content content={props.description} />


          <a href={`/edit/${props.id}`} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
          </a>
          
        </div>



      </div>
    </div>
  );
}

export default ProductContent;
