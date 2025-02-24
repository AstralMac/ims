/**
 * Author: Jake Seever
 * Date: 2/15/25
 * File: index.js
 * Description: IMS Inventory by ID
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors');
const { inventoryItem } = require('../../../models/inventoryItem');

//Find item by ID
router.get('/:Id', async (req, res, next) => {
  try {
   const item = await inventoryItem.findOne({_id: req.params.Id});
  res.send(item);
  } catch (err) {
    console.error(`Error getting item: ${err}`);
    next(err);
  }
 });


module.exports = router;

