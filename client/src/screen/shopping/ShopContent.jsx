import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shopcontent.css';
import ShopItem from './ShopItem';

function ShopContent({ titles }) {
  const [posts, setPosts] = useState(titles);

  useEffect(() => {
    setPosts(titles);
  }, [titles]);

  return (
    <div className="blog-section">
      <div className="container">
        <div className="row">
          {posts.map((data, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 mb-5">
              <ShopItem name={data.name} price={data.price} thumbnail={data.thumbnail} id={data._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopContent;
