/**
 * Author: Jake Seever
 * Date: 2/21/25
 * File: index.js
 * Description: IMS Search API
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors');
const { inventoryItem } = require('../../../models/inventoryItem');

//Find item by name search
router.get('/:name', async (req, res, next) => {
  try {
   const name = await inventoryItem.find({name: req.params.name}); //Find inventory items by the name 
  res.send(name);
  } catch (err) {
    console.error(`Error finding item with that search term: ${err}`); // Throw an error message if no item is found.
    next(err);
  }
 });


module.exports = router;

