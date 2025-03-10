/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * File: inventory.js
 * description: Schema of inventory items
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

//Defining inventory schema
let inventoryItemSchema = new Schema({
    categoryId: {type: Number, required:[true, 'Category ID is required']},
    supplierId: {type: Number, required:[true, 'Supplier ID is required']},
    name: {
        type: String,
        required: [true, 'Inventory item name is required'],
        minlength: [3, 'Inventory Item must be at least 3 characters long'],
        maxlength: [100, 'Inventory Item name cannot exceed 100 Characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    quantity: {
        type: Number, 
        required: [true, 'Quantity must be included'],
        min: [0, 'Quantity cannot be less than 0']},
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    dateModified:{
        type: Date
    }
});

inventoryItemSchema.pre('save', function(next){
    if(!this.isNew){
        this.dateModified = new Date();
    }
    next();
})


module.exports = {
    inventoryItem: mongoose.models.inventoryItem || mongoose.model('Inventory-Item', inventoryItemSchema),
    Counter
}
