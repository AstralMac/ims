/**
 * Author: Malcolm Abdullah
 * Date: Februaury 25th, 2025
 * File name: index.js
 * description: Supplier by ID API 
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors');
const {Suppliers} = require('../../../models/suppliers');

//Find Supplier by ID
router.get('/:id', async (req, res, next) => {
  //try/catch block to find the matching supplier by id
  try{
    //Validate the ID format for the supplier
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({message: 'Invalid supplier ID'});
    }
    const item = await Suppliers.findById(req.params.id);

    //IF validation if supplier is not found
    if(!item){
      return res.status(404).json({message: 'Supplier not found'});
    }
    //Pass a 200 status when the supplier is found in the database
    res.status(200).json({message: 'Supplier found', item});
  }catch(err){
    console.error(`Error getting supplier: ${err}`); //If error occurs while getting supplier, Catch block will run and pass on to the next 
    next(err);
  }
});

module.exports = router;