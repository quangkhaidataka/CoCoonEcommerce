import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './add.css';
import AddContent from './AddContent.jsx'

function AddForm() {

    const location = useLocation();
    const { id } = useParams(); // Assuming you're using react-router-dom's useParams to get the id, import the param from the URL
    const isEditMode = location.pathname.includes('/edit/');
    const navigate = useNavigate();


    // Determine the button label based on the path
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Default state values
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');



    useEffect(() => {
    if (isEditMode && id) {
        setLoading(true);
        fetch(`/edit/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched data:", data); // Log the fetched data
                setData(data);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setThumbnailUrl(data.thumbnail);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }
}, [id, isEditMode]);

   const buttonLabel = isEditMode ? 'Update Post' : 'Add Post';



    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = { name, price, description, thumbnailUrl };

        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            navigate("/shopping");

            setName('');
            setDescription('');
            setPrice('');
            setThumbnailUrl('');

        } catch (error) {
            console.error('Failed to submit new post:', error);
        }
    };


    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedPost = { name, price, description, thumbnailUrl };

        // ... implementation for editing a post ...

        try {
            const response = await fetch(`/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            navigate(`/shopping/${id}`);


        } catch (error) {
            console.error('Failed to update post:', error);
        }

    };

    const formSubmitHandler = isEditMode ? handleUpdate : handleSubmit;


    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-group">
                <label htmlFor="title">Name:</label>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="author">Price:</label>
                <input
                    className="form-control"
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Description:</label>
                <AddContent value={description} onChange={(value) => setDescription(value)} required />

            </div>
            <div className="form-group">
                <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
                <input
                    className="form-control"
                    type="text"
                    id="thumbnailUrl"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-success">{buttonLabel}</button>
        </form>
    );
}

export default AddForm;
