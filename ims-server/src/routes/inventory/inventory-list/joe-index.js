/*
const express = require('express');
const router = express.Router();
const { InventoryItem } = require('../../models/inventoryItem'); // Adjust the path as necessary

// Route to get all inventory items
router.get('/', async (req, res, next) => {
  try {
    const inventoryItems = await InventoryItem.find({});
    res.send(inventoryItems);
  } catch (err) {
    console.error(`Error while getting inventory items: ${err}`);
    next(err);
  }
});

// Route to get an inventory item by ID
router.get('/:itemId', async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findOne({ itemId: req.params.itemId });
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
      itemId: newItem.itemId
    });
  } catch (err) {
    console.error(`Error while creating inventory item: ${err}`);
    next(err);
  }
});

// Route to update an inventory item by ID
router.patch('/:itemId', async (req, res, next) => {
  try {
    const inventoryItem = await InventoryItem.findOne({ itemId: req.params.itemId });
    if (!inventoryItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    inventoryItem.set(req.body); // Update inventory item with request body data
    await inventoryItem.save();
    res.send({
      message: 'Inventory item updated successfully',
      itemId: inventoryItem.itemId
    });
  } catch (err) {
    console.error(`Error while updating inventory item: ${err}`);
    next(err);
  }
});

// Route to delete an inventory item by ID
router.delete('/:itemId', async (req, res, next) => {
  try {
    await InventoryItem.deleteOne({ itemId: req.params.itemId });
    res.send({
      message: 'Inventory item deleted successfully',
      itemId: req.params.itemId
    });
  } catch (err) {
    console.error(`Error while deleting inventory item: ${err}`);
    next(err);
  }
});

// Export the router
module.exports = router;
*/