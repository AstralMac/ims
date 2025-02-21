/**
 * Author: Malcolm Abdullah
 * Date: February 20th, 2025
 * File: index.js
 * description: API for updating inventory items
 */
'use strict';

const express = require('express');
const router = express.Router();
const { inventoryItem } = require('../../../models/inventoryItem');
const { updateInventoryItemSchema } = require('../../../scripts/schemas');
const createError = require('http-errors');
const Ajv = require('ajv');
const ajv = new Ajv();
const validateUpdateInventoryItem = ajv.compile(updateInventoryItemSchema);

router.patch('/:id', async (req, res, next) => {
  try {
    // Validate input using the schema
    const valid = validateUpdateInventoryItem(req.body);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateUpdateInventoryItem.errors)));
    }

    // Update the inventory item
    const item = await inventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Item was updated successfully', item });
  } catch (err) {
    console.error(`Error while updating inventory item: ${err}`);
    next(err);
  }
});

module.exports = router;
