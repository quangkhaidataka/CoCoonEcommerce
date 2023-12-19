import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shopcontent.css';

function ShopItem(props) {
  // Use template literal for embedding expressions
  const itemUrl = `/shopping/${props.id}`; // Corrected line

  return (
    <div className="post-entry">
      <a href={itemUrl} className="post-thumbnail">
        <img src={props.thumbnail} alt={`Image of ${props.title}`} className="img-fluid"/>
      </a>
      <div className="post-content-entry">
        <h3>
          <a href={itemUrl}>{props.name}</a>
        </h3>
        <div className="meta">
          <span>{props.price} USD</span>
        </div>
      </div>
    </div>
  );
}

export default ShopItem;
