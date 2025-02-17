/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: suppliers.js
 * description: mongoose schema for suppliers
 */

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining the counter schema
let counterSchema = new Schema({
    _id: {type: String, required:true},
    seq: {type: Number, default: 0}
});

//Creating the counter model
const Counter = mongoose.model('Counter', counterSchema);

let supplierSchema = new Schema({
  supplierId:{
    type: Number,
    required: true,
    unique: true
  },
  supplierName:{
    type: String,
    required: [true, 'Supplier name is required'],
    minlength: [ 3, 'Supplier name must be at least 3 characters long'],
    maxlength: [100, 'Supplier name cannot exceed 100 characters']
  },
  contactInformation: {
    type: String,
    maxlength: [500, 'Contact information cannot exceed 500 characters']
  },
  address: {
    type: String,
    required: [true, 'Supplier Address is required']
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
});

//Custom validator
supplierSchema.path('supplierName').validate(function(val){
    return /^[A-Za-z\s]+$/.test(val); //Only allow letters and spaces
}, 'Garden name can only contain letters and spaces');

/**
 * Pre-hook/function to increment category ID and update the date of modified documents
 */

supplierSchema.pre('validate', async function(next){
  let doc = this;

  if(this.isNew){
    try{
      const counter= await Counter.findByIdAndUpdate(
        {_id: 'supplierId'},
        {$inc: {seq: 1}},
        {new: true, upsert: true}
      );
      doc.supplierId = counter.seq
      next();
      }catch(err){
        console.error('Error in counter.findByIdAndUpdate:', err);
        next(err);
    }
  }else{
    doc.dateModified = new Date();
    next();
  }
});

module.exports = {
  Suppliers: mongoose.model('Suppliers', supplierSchema),
  Counter: mongoose.model('Counter', counterSchema)
};

