/**
 * Author: Jake Seever
 * Date: March 3rd, 2025
 * File: index.js
 * description: API for updating asupplier
 */
'use strict';

const express = require('express');
const router = express.Router();
const { Suppliers } = require('../../../../src/models/suppliers');
const { updateSupplierSchema } = require('../../../scripts/schemas');
const createError = require('http-errors');
const Ajv = require('ajv');

const ajv = new Ajv();
const updateSupplier = ajv.compile(updateSupplierSchema); // Schema Validator

router.patch('/:supplierId', async (req, res, next) => { // API Endpoint to update the supplier by the entered ID>
  try {
    // Validate input using the schema
    const valid = updateSupplier(req.body);
    if (!valid) { // Check if the updates are valid
      console.error('Validation errors:', ajv.errors); 
      return next(createError(400, ajv.errorsText(updateSupplier.errors))); // Return any validation errors
    }

    // Update the Supplier
    const supplier = await Suppliers.findOneAndUpdate( // Find one supplier by ID to update.
      req.params._id,
      req.body,
      { new: true }
    );

    if (!supplier) return res.status(404).json({ message: 'Supplier not found' }); // Throw an error if the supplier with that ID is not found

    res.json({ message: 'Supplier updated successfully', supplier }); // Send a supplier update success message if it worked.
  } catch (err) {
    console.error(`Error while updating supplier: ${err}`); // Conole log any error's if the supplier was not updated.
    next(err);
  }
});

module.exports = router;
