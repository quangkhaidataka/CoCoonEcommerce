import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './screen/homepage/Home';
import Shopping from './screen/shopping/Shopping';
import Product from './screen/product/Product';
import Add from './screen/add/Add';





function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/shopping/:id" element={<Product />} />
            <Route path="/add" element={<Add />} />
            <Route path="/search" element={<Shopping />} />
            <Route path="/edit/:id" element={<Add />} />




          </Routes>
        </div>
    </Router>

  );
}

export default App;
