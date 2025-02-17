
/**
 * Author: Jake Seever
 * Date: 2/15/25
 * File: index.js
 * Description: IMS Inventory API's
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the inventory item schema
const inventoryItemSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  name: { type: String, required: true, unique: true },
  description: String,
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});

// Create the model
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

// Create inventory item
router.post('/', async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search inventory items
router.get('/search/:term', async (req, res) => {
  try {
    const items = await InventoryItem.find({ name: new RegExp(req.params.term, 'i') });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

