import React, { useState } from 'react';
import axios from 'axios';

const InsertInventory = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState(null); // State for the image
    const [fileName, setFileName] = useState(''); // State for the selected file name
    const [message, setMessage] = useState('');

    // Handle image input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
        setFileName(file ? file.name : ''); // Update file name when a file is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to hold form values, including the image
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productQuantity', productQuantity);
        if (productImage) {
            formData.append('productImage', productImage); // Append image if provided
        }

        try {
            // Make a POST request to the API with FormData
            const response = await axios.post('http://localhost:3009/api/inventories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type
                },
            });

            setMessage('Product added successfully!');
            // Optionally reset form fields
            setProductId('');
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductQuantity('');
            setProductImage(null);
            setFileName(''); // Clear the file name after submission
        } catch (error) {
            setMessage('Error adding product: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Add New Inventory Item</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Product ID</label>
                    <input
                        type="text"
                        id="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description</label>
                    <input
                        type="text"
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">Product Quantity</label>
                    <input
                        type="number"
                        id="productQuantity"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="file-input-container">
                    <label htmlFor="productImage" className="file-input-label">
                        Choose Image
                    </label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleImageChange} // Handle image file selection
                        className="file-input"
                    />
                    {fileName && <span className="file-name">{fileName}</span>} {/* Display selected file name */}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Add Product
                </button>
            </form>
            {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
    );
};

export default InsertInventory;
