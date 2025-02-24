const express = require('express');
const router = express.Router();
const { inventoryItem } = require('../../../models/inventoryItem'); // Adjust the path as necessary

// Route to get all inventory items
router.get('/', async (req, res, next) => {
  try {
    const InventoryItems = await inventoryItem.find({});
    res.send(InventoryItems);
  } catch (err) {
    console.error(`Error while getting inventory items: ${err}`);
    next(err);
  }
});
/*
// Route to get an inventory item by ID
router.get('/:id', async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findOne({ id: req.params.id });
    if (!inventoryItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send(inventoryItem);
  } catch (err) {
    console.error(`Error while getting inventory item: ${err}`);
    next(err);
  }
});

// Route to create a new inventory item
router.post('/', async (req, res, next) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();
    res.send({
      message: 'Inventory item created successfully',
      id: newItem.id
    });
  } catch (err) {
    console.error(`Error while creating inventory item: ${err}`);
    next(err);
  }
});

// Route to update an inventory item by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findOne({ id: req.params.id });
    if (!inventoryItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    inventoryItem.set(req.body); // Update inventory item with request body data
    await inventoryItem.save();
    res.send({
      message: 'Inventory item updated successfully',
      id: inventoryItem.id
    });
  } catch (err) {
    console.error(`Error while updating inventory item: ${err}`);
    next(err);
  }
});

*/

// Export the router
module.exports = router;
