/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: categories.js
 * description: mongoose schema for categories
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
const Counter = mongoose.models.Counter||mongoose.model('Counter', counterSchema)

let categorySchema = new Schema({
  categoryId:{
    type: Number,
    required: true,
    unique: true
  },
  categoryName:{
    type: String,
    required: [true, 'Category name is required'],
    minlength: [ 3, 'Category name must be at least 3 characters long'],
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
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

categorySchema.path('categoryName').validate(function(val){
    return /^[A-Za-z\s]+$/.test(val); //Only allow letters and spaces
}, 'catagory name can only contain letters and spaces');

/**
 * Pre-hook/function to increment category ID and update the date of modified documents
 */

categorySchema.pre('validate', async function(next){
  let doc = this;

  if(this.isNew){
    try{
      const counter= await Counter.findByIdAndUpdate(
        {_id: 'categoryId'},
        {$inc: {seq: 1}},
        {new: true, upsert: true}
      );
      doc.categoryId = counter.seq
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
  Categories: mongoose.models.Categories|| mongoose.model('Categories', categorySchema),
  Counter 
};


