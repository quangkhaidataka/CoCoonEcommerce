import React, { useState, useEffect } from 'react';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderViewContent from './OrderViewContent'

function OrderView() {

    return (
      <div className="main-container">
        <Header />
        <div className="content">
        <OrderViewContent/>
        </div>
        <Footer />

      </div>
    );

}

export default OrderView;
