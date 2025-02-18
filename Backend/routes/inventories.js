const express = require('express');
const router = express.Router();
const Inventories = require('../models/inventory'); // Import the Inventory model
const upload = require('../middleware/upload'); // Multer configuration for image upload

// Test route to check if the inventory routes are working
router.get("/test", (req, res) => res.send("Inventory routes working..."));

// Route to add a new inventory item (CREATE)
router.post("/", upload.single('productImage'), (req, res) => {
    const { productId, productName, productDescription, productPrice, productQuantity } = req.body;

    // Get the filename of the uploaded image
    const productImage = req.file ? req.file.filename : ''; // Save only the filename

    const newInventory = new Inventories({
        productId,
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage  // Store only the filename
    });

    newInventory.save()
        .then(() => res.json({ msg: "Inventory item added successfully" }))
        .catch((err) => {
            console.error("Error adding inventory item:", err);
            res.status(400).json({ msg: "Inventory item adding failed", error: err.message });
        });
});


// Route to get all inventory items (READ)
router.get("/", (req, res) => {
    Inventories.find().exec()
        .then(inventories => res.json(inventories))
        .catch(err => res.status(400).json({ msg: "Error retrieving inventory...", error: err }));
});

// Route to get a single inventory item by ID (READ)
router.get("/:id", (req, res) => {
    Inventories.findById(req.params.id).exec()
        .then(inventory => {
            if (!inventory) return res.status(404).json({ msg: "Inventory not found..." });
            res.json(inventory);
        })
        .catch(err => res.status(404).json({ msg: "Inventory not found...", error: err }));
});

// Route to update an existing inventory item (UPDATE)
router.put("/:id", upload.single('productImage'), (req, res) => {
    const { productId, productName, productDescription, productPrice, productQuantity } = req.body;
    
    // Get the new filename if a new image was uploaded, otherwise use the existing one
    const productImage = req.file ? req.file.filename : req.body.productImage; 

    const updatedData = {
        productId,
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage, // Store the new or existing filename
    };

    Inventories.findByIdAndUpdate(req.params.id, updatedData, { new: true }).exec()
        .then(inventory => {
            if (!inventory) return res.status(404).json({ msg: "Inventory not found..." });
            res.json({ msg: "Inventory item updated successfully...", inventory });
        })
        .catch(err => res.status(400).json({ msg: "Inventory item updating failed...", error: err }));
});


// Route to delete an inventory item (DELETE)
router.delete("/:id", (req, res) => {
    Inventories.findByIdAndDelete(req.params.id)
        .then(inventory => {
            if (!inventory) return res.status(404).json({ msg: "Inventory not found..." });
            res.json({ msg: "Inventory item deleted successfully..." });
        })
        .catch(err => res.status(400).json({ msg: "Inventory item couldn't be deleted...", error: err }));
});

module.exports = router;
