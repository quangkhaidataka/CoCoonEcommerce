import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from './Banner'
import './home.css'


function Home() {

  return (
    <div className="main-container">
      <Header />
      <div className="content">
      <Banner/>
      </div>
      <Footer />

    </div>
  );
}

export default Home;
