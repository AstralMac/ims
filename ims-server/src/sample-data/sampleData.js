/**
 * Author: 
 * Date: 
 * File:
 * Description
 */

'use strict';

const mongoose = require('mongoose');
const { Categories } = require('../models/categories');
const { Suppliers } = require('../models/suppliers');
const { inventoryItem } = require('../models/inventoryItem');

// Mongoose Connection
const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';

const dbName = 'ims';

// Function to connect to MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });
    console.log(`Connection to the ${dbName} database was successful`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

connectToDatabase(); // Call the function to connect to the database

// Sample data for categories
const sampleCategories = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    categoryId: 1000,
    categoryName: "Electronics",
    description: "Electronic devices and gadgets",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-01T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    categoryId: 1001,
    categoryName: "Computer Accessories",
    description: "Peripherals and accessories for computers",
    dateCreated: "2021-02-10T00:00:00.000Z",
    dateModified: "2021-02-10T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c3",
    categoryId: 1002,
    categoryName: "Networking Equipment",
    description: "Routers, modems, and networking devices",
    dateCreated: "2021-03-15T00:00:00.000Z",
    dateModified: "2021-03-15T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c4",
    categoryId: 1003,
    categoryName: "Home Office",
    description: "Office chairs, desks, and work-from-home essentials",
    dateCreated: "2021-04-20T00:00:00.000Z",
    dateModified: "2021-04-20T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c5",
    categoryId: 1004,
    categoryName: "Audio and Sound",
    description: "Speakers, headphones, and audio equipment",
    dateCreated: "2021-05-05T00:00:00.000Z",
    dateModified: "2021-05-05T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c6",
    categoryId: 1005,
    categoryName: "Storage Devices",
    description: "Hard drives, SSDs, and flash storage solutions",
    dateCreated: "2021-06-30T00:00:00.000Z",
    dateModified: "2021-06-30T00:00:00.000Z"
  }
];

// Sample data for suppliers
const sampleSuppliers = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    supplierId: 1,
    supplierName: "TechSupplier",
    contactInformation: "123-456-7890",
    address: "123 Tech Street",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-01T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    supplierId: 2,
    supplierName: "Gadget Distributors",
    contactInformation: "987-654-3210",
    address: "456 Innovation Ave",
    dateCreated: "2021-02-10T00:00:00.000Z",
    dateModified: "2021-02-10T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c3",
    supplierId: 3,
    supplierName: "Elite Electronics",
    contactInformation: "555-333-2222",
    address: "789 Digital Plaza",
    dateCreated: "2021-03-15T00:00:00.000Z",
    dateModified: "2021-03-15T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c4",
    supplierId: 4,
    supplierName: "NextGen Components",
    contactInformation: "444-999-8888",
    address: "321 Future Way",
    dateCreated: "2021-04-20T00:00:00.000Z",
    dateModified: "2021-04-20T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c5",
    supplierId: 5,
    supplierName: "Precision Tech",
    contactInformation: "666-777-1111",
    address: "555 Quantum Street",
    dateCreated: "2021-05-05T00:00:00.000Z",
    dateModified: "2021-05-05T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c6",
    supplierId: 6,
    supplierName: "Infinity Supplies",
    contactInformation: "222-333-4444",
    address: "999 Infinity Loop",
    dateCreated: "2021-06-30T00:00:00.000Z",
    dateModified: "2021-06-30T00:00:00.000Z"
  }
];

// Sample data for inventory items
const sampleItems = [

  {
    _id: "650c1f1e1c9d440000a1b1c1",
    categoryId: 1000,
    supplierId: 1,
    name: "Laptop",
    description: "High-end gaming laptop",
    quantity: 10,
    price: 1500.00,
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-01T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    categoryId: 1000,
    supplierId: 2,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard",
    quantity: 25,
    price: 120.00,
    dateCreated: "2021-02-15T00:00:00.000Z",
    dateModified: "2021-02-15T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c3",
    categoryId: 1000,
    supplierId: 3,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI",
    quantity: 40,
    price: 60.00,
    dateCreated: "2021-03-10T00:00:00.000Z",
    dateModified: "2021-03-10T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c4",
    categoryId: 1000,
    supplierId: 1,
    name: "27-inch Monitor",
    description: "4K UHD monitor with HDR support",
    quantity: 15,
    price: 400.00,
    dateCreated: "2021-04-05T00:00:00.000Z",
    dateModified: "2021-04-05T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c5",
    categoryId: 1000,
    supplierId: 4,
    name: "Gaming Headset",
    description: "Surround sound gaming headset with noise cancellation",
    quantity: 30,
    price: 80.00,
    dateCreated: "2021-05-20T00:00:00.000Z",
    dateModified: "2021-05-20T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c6",
    categoryId: 1000,
    supplierId: 2,
    name: "External SSD",
    description: "1TB portable SSD with USB-C",
    quantity: 20,
    price: 150.00,
    dateCreated: "2021-06-12T00:00:00.000Z",
    dateModified: "2021-06-12T00:00:00.000Z"
  }
];

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
