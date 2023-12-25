import React from 'react';
import './styles.css';

function Banner() {
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center ">
      <div className="col-md-6 p-lg-5 mx-auto my-5">
        <h1 className="display-3 fw-bold" style={{ color: 'black' }}>Nhi Cocoon</h1>
        <h3 className="fw-normal text-muted mb-3" style={{ color: 'white' }}>Make your skin care be natural</h3>

        <div className="d-flex gap-3 justify-content-center lead fw-normal">
          <a className="icon-link" href="/about">
            Learn more
            <svg className="bi"><use xlinkHref="#chevron-right"/></svg>
          </a>
          <a className="icon-link" href="/shopping">
            Buy
            <svg className="bi"><use xlinkHref="#chevron-right"/></svg>
          </a>
        </div>
      </div>
      <div className=" shadow-sm d-none d-md-block"></div>
      <div className="product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
}

export default Banner;
