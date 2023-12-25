import React, { useState, useEffect } from 'react';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderContent from './OrderContent'

function Order() {

    return (
      <div className="main-container">
        <Header />
        <div className="content">
        <OrderContent/>
        </div>
        <Footer />

      </div>
    );

}

export default Order;
