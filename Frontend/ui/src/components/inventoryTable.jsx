import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable for generating tables in PDF
import Chart from 'chart.js/auto'; // Import Chart.js
import './inventoryTable.css';

const InventoryTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3009/api/inventories')
      .then(response => {
        setSubmittedData(response.data);
        setFilteredData(response.data); // Initialize filteredData with full data
      })
      .catch(err => {
        console.log("Error fetching data:", err);
      });

    if (location.state && location.state.update) {
      setSubmittedData((prevData) => {
        const updatedData = prevData.map((item) => {
          if (item._id === location.state.data._id) {
            return location.state.data;
          }
          return item;
        });
        return updatedData;
      });
    }
  }, [location.state]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = submittedData.filter(
      (data) =>
        data.productName.toLowerCase().includes(lowerCaseQuery) ||
        data.productId.toLowerCase().includes(lowerCaseQuery) ||
        data.productDescription.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, submittedData]);

  const handleUpdate = (data) => {
    navigate(`/update-inventory/${data._id}`, { state: data });
  };

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3009/api/inventories/${id}`)
      .then(response => {
        setSubmittedData(prevData => prevData.filter(item => item._id !== id));
        setFilteredData(prevData => prevData.filter(item => item._id !== id));
      })
      .catch(err => {
        console.log("Delete error:", err);
      });
  };

  const generateBarChart = (doc, data) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Generate the chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.productName), // X-axis: product names
        datasets: [{
          label: 'Quantity',
          data: data.map(item => item.productQuantity), // Y-axis: product quantities
          backgroundColor: '#4CAF50', // Green color for bars
        }],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    // Convert chart to image and add to the PDF
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 15, 60, 180, 60); // Adjust position and size as needed
  };

  const addWatermark = (doc) => {
    doc.setFontSize(50);
    doc.setTextColor(150, 150, 150);
    doc.text('Green Vibe', 50, doc.internal.pageSize.height - 20, {
      angle: 45, // Rotate the text
    });
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Green Vibe - Eco-Friendly Waste System', 14, 22); // Company name header

    doc.autoTable({
      head: [['Product ID', 'Product Name', 'Description', 'Price', 'Quantity']],
      body: filteredData.map(item => [
        item.productId,
        item.productName,
        item.productDescription,
        item.productPrice,
        item.productQuantity,
      ]),
      startY: 30,
    });

    generateBarChart(doc, filteredData); // Add the bar chart

    addWatermark(doc); // Add watermark

    doc.save('inventory-data.pdf');
  };

  return (
    <div>
      <h1>INVENTORY DATABASE TABLE</h1>
      <div className="action-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={downloadAllPDF} 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            marginLeft: '10px', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            fontSize: '16px', 
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Download All PDF
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.productId}</td>
                <td>{data.productName}</td>
                <td>{data.productDescription}</td>
                <td>{data.productPrice}</td>
                <td>{data.productQuantity}</td>
                <td>
                  <button onClick={() => handleUpdate(data)}>Update</button>
                  <button onClick={() => onDeleteClick(data._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data submitted</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
