import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

function Footer() {
  return (
    <footer className="bg-dark text-light main-footer">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2023 Your Website Name</p>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
