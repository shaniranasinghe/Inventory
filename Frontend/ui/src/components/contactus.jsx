import React from 'react';

const ContactUs = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F1F8E7', // Light eco-friendly green background
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space between cards
    alignItems: 'stretch', // Ensure all cards stretch to the same height
    width: '70%', // Bigger white square
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for a professional look
    margin: '0 auto', // Center the content horizontally
    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtEE7lW2I47H7slMrb5neBfDdNkatv8Em5Q&s')`, // Add new background image
    backgroundSize: 'cover', // Cover the entire area
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    justifyContent: 'space-between', // Space out content and button
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white to see the background image
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for cards
    width: 'calc(50% - 20px)', // Use calc to account for spacing between cards
    textAlign: 'center',
    margin: '10px', // Space between cards
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2E7D32', // Dark green for buttons
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const headerStyle = {
    color: '#1B5E20', // Dark green for header
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '40px',
  };

  const cardHeaderStyle = {
    fontSize: '22px',
    color: '#2E7D32', // Matching green for card titles
    marginBottom: '10px',
  };

  const cardTextStyle = {
    fontSize: '16px',
    color: '#757575', // Subtle gray for text
    marginBottom: '20px',
  };

  const imageStyle = {
    borderRadius: '50%',
    marginBottom: '15px',
    width: '100px',
    height: '100px',
    objectFit: 'cover', // Ensures image fits inside the circle
  };

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={headerStyle}>Contact Us</h1>
        <div style={contentStyle}>
          <div style={cardStyle}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgThoC4ddtlUa8anpSk1IZkVCudn8n_UDVsQ&s"
              alt="Sales Team"
              style={imageStyle}
            />
            <h2 style={cardHeaderStyle}>Talk to a member of our Sales team</h2>
            <p style={cardTextStyle}>
              We'll help you find the right products and pricing for your business.
            </p>
            <button style={buttonStyle}>Contact Sales</button>
          </div>

          <div style={cardStyle}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugaozJsz5hOis97Bxfsu7NYne58G1tH17lA&s"
              alt="Support"
              style={imageStyle}
            />
            <h2 style={cardHeaderStyle}>Product and account support</h2>
            <p style={cardTextStyle}>
              Our help center is fresh and always open for business. If you can't find the answer you're looking for, we're here to lend a hand.
            </p>
            <button style={buttonStyle}>Go to the help center</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
