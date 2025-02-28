/**
 * Author: Jake Seever
 * Date: February 26th, 2025
 * File: index.js
 * description: API For Adding a Suppplier
 */

'use strict';

//Require the needed modules
const express = require('express');
const router = express.Router();

const { Suppliers } = require('../../../../src/models/suppliers');
const Ajv = require('ajv');
const { addSupplierSchema } = require('../../../scripts/schemas');
const createError = require('http-errors');

const ajv = new Ajv();
const validateAddSupplier = ajv.compile(addSupplierSchema);

//API endpoint to add a new supplier
router.post('/', async (req, res, next)=> {
   try {
    // Validate input using the schema
    const valid = validateAddSupplier(req.body);
    console.log(valid);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddSupplier.errors)));
    }

    const { supplierId, supplierName, contactInformation, address, dateCreated } = req.body;

    // Ensure all required fields are present
    if (!supplierId || !supplierName || !contactInformation || !address || !dateCreated) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const payload = { supplierId, supplierName, contactInformation, address, dateCreated };
    const supplier = new Suppliers(payload); // Start here tomorrow. 
    await supplier.save();

    res.status(200).send({
      message: 'Supplier was added successfully',
      id: supplier._id
    });
  } catch (err) {
    console.error(`Error while adding new supplier: ${err}`);
    next(err);
  }
});

module.exports = router;