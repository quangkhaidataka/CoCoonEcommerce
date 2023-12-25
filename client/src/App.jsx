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
import Cart from './screen/cart/Cart';
import Order from './screen/orders/Order';
import OrderView from './screen/orders/OrderView';
import About from './screen/about/About';


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
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/about" element={<About />} />

            <Route path="/orders/:id/products" element={<OrderView />} />




          </Routes>
        </div>
    </Router>

  );
}

export default App;
