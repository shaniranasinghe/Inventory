import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Insert from "./components/insert";
import Footer from './components/Footer';
import InventoryList from './components/inventoryList';
import InventoryTable from './components/inventoryTable';
import Navbar from './components/Navbar';
import UpdateInventory from './components/UpdateInventory';
import Faq from './components/faq'; // Import the Faq component
import ContactUs from './components/contactus'; // Corrected import path

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<InventoryList />} />
          <Route path="/inventory-table" element={<InventoryTable />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/update-inventory/:id" element={<UpdateInventory />} />
          <Route path="/faq" element={<Faq />} /> {/* Added route for FAQ */}
          <Route path="/contact-us" element={<ContactUs />} /> {/* Corrected Contact Us Route */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
