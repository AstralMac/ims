/**
 * Author: 
 * Date: 
 * File:
 * Description
 */

'use strict';

const mongoose = require('mongoose');
const {Categories} = require('../models/categories');
const {Suppliers}= require('../models/suppliers');
const {inventoryItem}= require('../models/inventoryItem');


// Mongoose Connection
const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';

const dbName = 'ims';

//function to connect to mongodb database
async function connectToDatabase(){
  try{
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });
    console.log(`connection to the ${dbName} database was successful`);
  } catch(err){
    console.error(`MongoDb connection err: ${err}`);
  }
}

connectToDatabase(); //Call the function to connect to the database


//Sample data for categories
const sampleCategories = [
  {
    "_id": "650c1f1e1c9d440000a1b1c1",
    "categoryId": 1000,
    "categoryName": "Electronics",
    "description": "Electronic devices and gadgets",
    "dateCreated": "2021-01-01T00:00:00.000Z",
    "dateModified": "2021-01-01T00:00:00.000Z"
  }
];

// Sample Data for Suppliers
const sampleSuppliers = [
  {
    "_id": "650c1f1e1c9d440000a1b1c1",
    "supplierId": 1,
    "supplierName": "TechSupplier",
    "contactInformation": "123-456-7890",
    "address": "123 Tech Street",
    "dateCreated": "2021-01-01T00:00:00.000Z",
    "dateModified": "2021-01-01T00:00:00.000Z"
  }
];


// Sample data for inventoryItems
const sampleItems = [
  {
    "_id": "650c1f1e1c9d440000a1b1c1",
    "itemId": 1,
    "categoryId": 1000,
    "supplierId": 1,
    "name": "Laptop",
    "description": "High-end gaming laptop",
    "quantity": 10,
    "price": 1500.00,
    "dateCreated": "2021-01-01T00:00:00.000Z",
    "dateModified": "2021-01-01T00:00:00.000Z"
  }
]
// Function to create sample data
async function createSampleData() {
try {
// Clear existing data
await Categories.deleteMany({});
await Suppliers.deleteMany({});
await inventoryItem.deleteMany({});


    // Insert categories
    await Categories.insertMany(sampleCategories);
    console.log('Sample categories inserted successfully.');

    // Insert suppliers
    await Suppliers.insertMany(sampleSuppliers);
    console.log('Sample suppliers inserted successfully.');

    // Insert inventory items
    await inventoryItem.insertMany(sampleItems);
    console.log('Sample inventory items inserted successfully.');

  } catch (err) {
    console.error('Error creating sample data:', err);
  } finally {
    mongoose.connection.close(); // Ensure connection is closed after operation
    console.log('Database connection closed.');
  }
}

// Run the function to create sample data
createSampleData();