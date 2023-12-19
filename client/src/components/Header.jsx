import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <section className="hello">
      <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom" data-bs-theme="dark">
        <div className="container">


          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasLabel">Aperture</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 justify-content-between">
                <li className="nav-item"><a className="nav-link" href="#">
                  <svg className="bi" width="24" height="24"><use xlinkHref="#aperture"/></svg>
                </a></li>
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/shopping" className="nav-link">Shopping</Link></li>
                <li className="nav-item"><Link to="/" className="nav-link">Contact</Link></li>
                <li className="nav-item"><Link to="/" className="nav-link">About Us</Link></li>


                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <svg className="bi" width="24" height="24"><use xlinkHref="#cart"/></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;
