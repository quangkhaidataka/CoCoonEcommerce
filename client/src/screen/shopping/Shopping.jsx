import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Import Bootstrap CSS in your React component
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

import ShopContent from './ShopContent';
import CustomPagination from './Pagenation';
import './shop.css'


function Shopping() {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    let url = `/shopping?page=${currentPage}&limit=6`;

    if (location.pathname === '/search' && location.state?.results) {
      setData(location.state.results);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data.data);
          setTotalPages(data.totalPages);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [location, currentPage]);


  return (
    <div className="main-container">
      <Header />
      <div className="content">
        <SearchBar/>

        <ShopContent titles={data}/>

        <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}/>



      </div>


      <Footer />

    </div>
  );
}

export default Shopping;
