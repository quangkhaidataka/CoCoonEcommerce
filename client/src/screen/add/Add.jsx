import React from 'react';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AddForm from './AddForm';


function Add() {
  return (
    <div className="main-container">
      <Header />
      <div className="content">
      <AddForm/>
      </div>
      <Footer />

    </div>
  );
}

export default Add;
