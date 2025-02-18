import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InventoryCard from './inventoryCard';
import './inventoryCard.css';
import './inventoryList.css';

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventories, setFilteredInventories] = useState([]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = inventories.filter(
      (inventory) => inventory.productName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredInventories(filtered);
  }, [searchQuery, inventories]);

  useEffect(() => {
    axios.get("http://localhost:3009/api/inventories")
      .then((res) => {
        setInventories(res.data);
        setFilteredInventories(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const inventoriesList = filteredInventories.length === 0
    ? "No inventory item found!"
    : filteredInventories.map((inventory, index) => (
      <InventoryCard key={index} inventory={inventory} />
    ));

  const handleDataClick = () => {
    navigate('/inventory-table', { state: inventories });
  };

  return (
    <div className='Show_InventoryList'>
      <div className='container'>
        <div className="search-bar">
          <input type="text" placeholder="Search for inventory items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <button className='top-right-button' onClick={handleDataClick}>Data</button>
        <div className='list'>{inventoriesList}</div>
      </div>
    </div>
  );
};

export default InventoryList;
