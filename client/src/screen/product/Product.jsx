import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductContent from './ProductContent';

function Loading() {
  return <div>Loading...</div>;
}

function ErrorMessage({ message }) {
  return <div>Error: {message}</div>;
}

function Product() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/shopping/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setData(null);
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="main-container">
      <Header />
      <div className="content">
        {data ? (
          <ProductContent
            id = {data._id}
            name={data.name}
            thumbnail={data.thumbnail}
            price={data.price}
            description={data.description}
          />
        ) : (
          <div>No product found.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
