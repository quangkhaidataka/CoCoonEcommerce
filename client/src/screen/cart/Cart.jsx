import React, { useState, useEffect } from 'react';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartContent from './CartContent'

function Cart() {

    return (
      <div className="main-container">
        <Header />
        <div className="content">
        <CartContent/>
        </div>
        <Footer />

      </div>
    );

}

export default Cart;
