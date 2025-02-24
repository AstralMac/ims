/**
 * Author: Malcolm Abdullah
 * Date: February 16th, 2025
 * File: index.spec.js
 * description: Tests for "Create Inventory Item" API
 */

'use strict';

//Require the needed modules
const express = require('express');
const router = express.Router();

const {inventoryItem} = require('../../../../src/models/inventoryItem');
const Ajv = require('ajv');
const {addInventoryItemSchema} = require('../../../scripts/schemas');
const createError = require('http-errors');

const ajv = new Ajv();
const validateAddInventoryItem = ajv.compile(addInventoryItemSchema);

//API endpoint to add item to inventory
router.post('/', async (req, res, next)=> {
   try {
    // Validate input using the schema
    const valid = validateAddInventoryItem(req.body);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddInventoryItem.errors)));
    }

    const { categoryId, name, supplierId, description, quantity, price, dateCreated } = req.body;

    // Ensure all required fields are present
    if (!categoryId || !name || !supplierId || !quantity || !price || !dateCreated) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const payload = { categoryId, name, supplierId, description, quantity, price, dateCreated};
    const item = new inventoryItem(payload);
    await item.save();

    res.status(201).send({
      message: 'Item was created successfully',
      id: item._id
    });
  } catch (err) {
    console.error(`Error while creating inventory item: ${err}`);
    next(err);
  }
});

module.exports = router;