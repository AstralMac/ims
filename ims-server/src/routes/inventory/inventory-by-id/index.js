
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
const {inventoryItem} = require('../../../models/inventoryItem');
const Ajv = require ('ajv');
const {addInventoryItemSchema, updateInventoryItemSchema} = require('../../../scripts/schemas');
const createError = require('http-errors');

const ajv = new Ajv();
const validateAddInventoryItem = ajv.compile(addInventoryItemSchema);
const validateUpdateInventoryItem = ajv.compile(updateInventoryItemSchema);

// List all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await inventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await inventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create inventory item
router.post('/', async (req, res) => {
  try {
    const newItem = new inventoryItem(req.body);
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const item = await inventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    const item = await inventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Search inventory items
router.get('/search/:term', async (req, res) => {
  try {
    const items = await inventoryItem.find({ name: new RegExp(req.params.term, 'i') });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

