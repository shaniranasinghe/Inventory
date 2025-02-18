import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import './inventoryCard.css';

const InventoryCard = ({ inventory }) => {
  const [quantity, setQuantity] = useState(inventory.productQuantity);

  useEffect(() => {
    setQuantity(inventory.productQuantity);
  }, [inventory.productQuantity]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateInventoryQuantity(inventory.productId, newQuantity);
    }
  };

  const updateInventoryQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`/api/inventory/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productQuantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating inventory quantity:', error);
    }
  };

  if (!inventory) return <div>No inventory data available.</div>;

  // Construct the full image URL here
  const imageUrl = `http://localhost:3009/uploads/${inventory.productImage}`;

  return (
    <div>
      <Card sx={{ maxWidth: 250, margin: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardActionArea>
        <CardMedia
  component="img"
  height="150" // Set this based on the card size
  image={imageUrl}
  sx={{
    borderRadius: '10px',
    marginBottom: '10px',
    objectFit: 'cover', // Ensures the image covers the area without stretching
    width: '100%', // Makes the image take the full width of the container
    height: '150px',
    width: '250px'  // Control the height of the image
  }}
/>

          <CardContent sx={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '1.4em', fontWeight: 'bold', marginBottom: '10px' }}>
              {inventory.productName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                marginBottom: '15px',
                color: quantity > 0 ? 'lightgreen' : 'red'
              }}
            >
              {quantity > 0 ? 'STOCK IN' : 'OUT OF STOCK'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', marginBottom: '15px' }}>
              Description: {inventory.productDescription}
            </Typography>
            <Typography variant="h6" component="div" sx={{ fontSize: '1.4em', fontWeight: 'bold', marginBottom: '10px' }}>
              RS.{inventory.productPrice}.00
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            size="small"
            sx={{
              backgroundColor: '#c40000',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '5px',
              fontSize: '1em',
              '&:hover': {
                backgroundColor: '#b30000',
              },
            }}
            onClick={handleAddToCart}
            disabled={quantity === 0} // Disable button if quantity is 0
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default InventoryCard;
