//index.js

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors'); // For handling HTTP errors
const { Suppliers } = require('../../../models/suppliers');

// Search for suppliers by name
router.get('/:name', async (req, res, next) => {
  try {

   const name = await Suppliers.find({name: req.params.name}); //Find inventory items by the name 
   
  res.send(name);

  } catch (err) {
    console.error(`Error finding supplier with that search term: ${err}`); // Log the error for debugging
    next(createError(500, `Error occurred while searching for suppliers: ${err.message}`)); // Server error
  };

});

module.exports = router;
