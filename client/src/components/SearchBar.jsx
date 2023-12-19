import React,{ useState,useEffect } from 'react';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SearchBar() {

  const [search,setSearch] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
        event.preventDefault();
        const newSearch = { search };

        try {
            const response = await fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSearch),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            navigate("/search", { state: { results: responseData } });
            setSearch('');


        } catch (error) {
            console.error('Failed to submit new post:', error);
        }
    };

  function handleChange(event){
    setSearch(event.target.value);
  }





  return (
    <form onSubmit={handleSubmit}>
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input onChange={handleChange} type="text" className="form-control search-input" placeholder="Search anything..." />
          </div>
        </div>
      </div>
    </form>

  );
}

export default SearchBar;
