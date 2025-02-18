import React from 'react';

const Faq = () => {
  const faqStyle = {
    backgroundColor: '#eafaf1', // Soft green for eco-friendly feel
    color: '#2d6a4f', // Dark green text for readability
    padding: '20px',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '900px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const questionStyle = {
    marginTop: '20px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const answerStyle = {
    marginTop: '10px',
    fontSize: '1rem',
    lineHeight: '1.5',
  };

  return (
    <div style={faqStyle}>
      <h1 style={headerStyle}>FAQs</h1>
      
      <div style={questionStyle}>
        1. What is an eco-friendly waste system?
        <p style={answerStyle}>
          An eco-friendly waste system is designed to minimize environmental impact by promoting recycling, composting, and responsible waste management practices.
        </p>
      </div>
      
      <div style={questionStyle}>
        2. How does your waste system work?
        <p style={answerStyle}>
          Our system utilizes separate bins for recyclables, compost, and general waste, along with educational resources to help users sort their waste correctly.
        </p>
      </div>
      
      <div style={questionStyle}>
        3. What materials can be composted?
        <p style={answerStyle}>
          You can compost kitchen scraps (fruits, vegetables, coffee grounds), yard waste (leaves, grass clippings), and certain paper products (uncoated cardboard, paper towels).
        </p>
      </div>

      <div style={questionStyle}>
        4. How can I get started with your waste system?
        <p style={answerStyle}>
          Simply choose the waste system package that best fits your needs, and follow the included guidelines for setup and usage.
        </p>
      </div>

      <div style={questionStyle}>
        5. Is there a fee for the service?
        <p style={answerStyle}>
          Yes, we offer various packages at different price points, designed to accommodate homes and businesses. Check our pricing page for more details.
        </p>
      </div>

      <div style={questionStyle}>
        6. What happens to the waste after it’s collected?
        <p style={answerStyle}>
          Recyclables are sent to processing centers, compost is transformed into nutrient-rich soil, and non-recyclable waste is managed in the most environmentally responsible way possible.
        </p>
      </div>

      <div style={questionStyle}>
        7. Can I customize the waste bins for my specific needs?
        <p style={answerStyle}>
          Yes! We offer customizable options for our waste bins to fit your space and usage requirements.
        </p>
      </div>

      <div style={questionStyle}>
        8. How can I encourage my community to participate?
        <p style={answerStyle}>
          We provide educational resources, workshops, and community events to help raise awareness and promote participation in eco-friendly waste practices.
        </p>
      </div>

      <div style={questionStyle}>
        9. What if I have more questions or need support?
        <p style={answerStyle}>
          Feel free to contact our support team via email or phone for any additional questions or assistance.
        </p>
      </div>

      <div style={questionStyle}>
        10. How does your system contribute to sustainability?
        <p style={answerStyle}>
          By reducing landfill waste, increasing recycling rates, and promoting composting, our system helps conserve resources and lower carbon footprints.
        </p>
      </div>
    </div>
  );
};

export default Faq;
