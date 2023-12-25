import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from './Banner'
import './home.css'


function Home() {

  return (
    <div className="main-container">
      <Header />
      <div
        className="content"
          style={{
            backgroundImage: `url('https://c8.alamy.com/comp/2CC8T0T/cosmetics-composition-green-leaves-shower-gel-perfume-oil-in-a-tube-and-a-candle-are-laid-out-on-a-white-background-copy-space-flat-lay-horizon-2CC8T0T.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh' // Adjust height as needed
          }}
      >
      <Banner/>
      </div>
      <Footer />

    </div>
  );
}

export default Home;
