import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

function UpdateInventory() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    productQuantity: 0,
    productPrice: 0,
    productImage: "" // To handle the image
  });

  const [selectedFile, setSelectedFile] = useState(null); // To store the selected image file

  useEffect(() => {
    if (location.state) {
      setInventory(location.state);
    } else {
      axios
        .get(`http://localhost:3009/api/inventories/${id}`)
        .then((res) => {
          setInventory({
            _id: res.data._id,
            productName: res.data.productName,
            productDescription: res.data.productDescription,
            productQuantity: res.data.productQuantity,
            productPrice: res.data.productPrice,
            productImage: res.data.productImage // Include image data
          });
        })
        .catch((err) => {
          console.log("Error from update inventory", err);
        });
    }
  }, [id, location.state]);

  const onChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  // Handle file change
  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file state
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for sending the image file
    const formData = new FormData();
    formData.append('productId', inventory.productId);
    formData.append('productName', inventory.productName);
    formData.append('productDescription', inventory.productDescription);
    formData.append('productQuantity', inventory.productQuantity);
    formData.append('productPrice', inventory.productPrice);

    if (selectedFile) {
      formData.append('productImage', selectedFile); // Append the image file if selected
    }

    try {
      const res = await axios.put(`http://localhost:3009/api/inventories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Navigate back to inventory table with updated data
      navigate("/inventory-table", { state: { update: true, data: res.data } });
    } catch (err) {
      console.log("Error in update", err);
    }
  };

  return (
    <div>
      <h3>Update Inventory</h3>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={inventory.productId}
            onChange={onChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={inventory.productName}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={inventory.productPrice}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            value={inventory.productDescription}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="productQuantity">Product Quantity:</label>
          <input
            type="number"
            id="productQuantity"
            name="productQuantity"
            value={inventory.productQuantity}
            onChange={onChange}
          />
        </div>

        {/* File input for updating the product image */}
        <div>
  <label htmlFor="productImage" style={{ fontWeight: "bold", marginBottom: "10px" }}>
    Product Image:
  </label>
  <br />

  {/* File input with inline CSS */}
  <input
    type="file"
    id="productImage"
    name="productImage"
    onChange={onFileChange}
    style={{
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      display: "block",
      width: "100%",
    }}
  />
</div>

        {/* Show existing product image */}
        {inventory.productImage && (
          <div>
            <img
              src={`http://localhost:3009/uploads/${inventory.productImage}`}
              alt="Product"
              style={{ width: "150px", height: "100px", marginTop: "10px" }}
            />
          </div>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateInventory;
