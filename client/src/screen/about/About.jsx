import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutContent from './AboutContent';
import './about.css'


function About() {

  return (
    <div className="main-container">
      <Header />
      <div className="content">
      <AboutContent/>
      </div>
      <Footer />

    </div>
  );
}

export default About;
