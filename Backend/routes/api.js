const express = require('express');
const router = express.Router();
const Inventories = require('../models/inventory'); // Import the Inventory model
const upload = require('../middleware/upload'); // Import multer configuration

// Route to add a new inventory item
router.post("/", upload.single('productImage'), (req, res) => {
  const { productId, productName, productDescription, productPrice, productQuantity } = req.body;
  const productImage = req.file.path; // Path of the uploaded image

  const newInventory = new Inventories({
    productId,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImage
  });

  newInventory.save()
    .then(() => res.json({ msg: "Inventory item added successfully" }))
    .catch((err) => res.status(400).json({ msg: "Inventory item adding failed", error: err }));
});

module.exports = router;
