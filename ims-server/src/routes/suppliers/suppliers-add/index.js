/**
 * Author: Jake Seever
 * Date: February 26th, 2025
 * File: index.js
 * description: API For Adding a Suppplier
 */

"use strict";

//Require the needed modules
const express = require("express");
const router = express.Router();

const { Suppliers } = require("../../../../src/models/suppliers");
const Ajv = require("ajv");
const { addSupplierSchema } = require("../../../scripts/schemas");
const createError = require("http-errors");

const ajv = new Ajv();
const validateAddSupplier = ajv.compile(addSupplierSchema); // Schema Validator

//API endpoint to add a new supplier
router.post("/", async (req, res, next) => {
  try {
    // Validate input using the schema
    const valid = validateAddSupplier(req.body);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddSupplier.errors))); // Error message if form is not valid when trying to submit.
    }

    const { supplierName, contactInformation, address } = req.body; //Get the form field values from request.

    // Ensure all required fields are present
    if (!supplierName || !contactInformation || !address) {
      return res.status(400).send({ message: "Missing required fields" }); // If form fields not valid, send error message.
    }

    const payload = { supplierName, contactInformation, address };
    const supplier = new Suppliers(payload); // Save the payload to the supplier object.
    await supplier.save(); // Save the object

    res.status(200).send({
      message: "Supplier was added successfully", // If supplier saved correctly, send confirmation message.
      id: supplier._id,
    });
  } catch (err) {
    console.error(`Error while adding new supplier: ${err}`); // Throw error message if supplier not saved.
    next(err);
  }
});

module.exports = router;
