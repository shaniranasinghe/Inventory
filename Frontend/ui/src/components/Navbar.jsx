import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: '#2E7D32', // Dark green background for eco-friendly theme
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
    padding: '10px 20px', // Padding for the navbar
  };

  const brandStyle = {
    fontSize: '1.5rem', // Larger font size for brand
    color: '#FFFFFF', // White color for brand text
    fontWeight: 'bold', // Bold font for brand
    textDecoration: 'none', // Remove underline for brand text
    marginRight: '20px', // Space between brand and links
  };

  const navLinkStyle = {
    color: '#FFFFFF', // White text for nav links
    padding: '0.75rem 1rem', // Padding for links
    transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effects
    textDecoration: 'none', // Remove underline
  };

  const activeLinkStyle = {
    backgroundColor: '#1B5E20', // Darker green for active link
    borderRadius: '4px', // Rounded corners for active link
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo01" 
          aria-controls="navbarTogglerDemo01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} // Light border for toggle button
        >
          <span className="navbar-toggler-icon" style={{
            backgroundImage: "url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'white\\' height=\\'30\\' width=\\'30\\' viewBox=\\'0 0 30 30\\'%3E%3Cpath stroke=\\'currentColor\\' stroke-width=\\'2\\' d=\\'M4 7h22M4 15h22M4 23h22\\'/%3E%3C/svg%3E')"
          }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" style={brandStyle}>Home</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" style={navLinkStyle} activeStyle={activeLinkStyle}>
                Store
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/insert" className="nav-link" style={navLinkStyle} activeStyle={activeLinkStyle}>
                Add Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/faq" className="nav-link" style={navLinkStyle} activeStyle={activeLinkStyle}>
                FAQ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact-us" className="nav-link" style={navLinkStyle} activeStyle={activeLinkStyle}>
                Contact Us
              </NavLink> {/* Enabled Contact Us link */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
