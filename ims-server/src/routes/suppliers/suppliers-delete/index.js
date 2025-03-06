/**
 * Author: Malcolm Abdullah
 * Date: March 04, 2025
 * File: index.js
 * description: API to delete supplier entry
 */
'use strict';

//Import the needed modules and dependencies
const express = require('express');
const router = express.Router();
const {Suppliers} = require('../../../../src/models/suppliers');

//Route to delete supplier entry from database by supplierId
router.delete('/:id', async( req, res, next)=> {
  //Log supplierId for debugging purposes
  try{
    console.log('Supplier ID recieved:', req.params.id);
    const supplier = await Suppliers.deleteOne({ _id:req.params.id});
    
    //If the supplier entry exists and is 
    if (supplier.deletedCount === 1){
      res.send({
        message: 'Supplier entry has been deleted',
        id: req.params.id
      });
    } else {
      //Throw an error if the item does not exist in the database
      res.status(404).json({message: 'Supplier entry not found'});
    }
  } catch (err) {
    //Print the error to the console
    console.error(`Error while deleting supplier entry: ${err.message}`);
    next(err);
  }
});

module.exports = router;
