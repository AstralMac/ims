/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: inventoryItems.spec.js
 * description: tests for inventory Items mongoose schema
 */

'use strict';

const mongoose = require('mongoose');
const {inventoryItem} = require('../../src/models/inventoryItem');


//Connection to the database
beforeAll(async ()=> {
  const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';
  try{
    await mongoose.connect(connectionString,{
      dbName: 'ims'
    });
    console.log('Connection to the database instance was successful.')
  }catch (err){
    console.error(`MongoDB connection error: ${err}`);
  }
});

//Clear database before each test
beforeEach(async()=>{
  await inventoryItem.deleteMany({})
});

//Close the database connection after all tests
afterAll(async()=>{
  await mongoose.connection.close();
  console.log('Database connection is closing');
});

//Test suite for inventoryItems Model
describe('Inventory Item Model Test', ()=>{
it('should create a inventory item successfully', async()=>{
  const inventoryItemData = 
   {
    categoryId: 1000,
    supplierId: 1,
    name: "Laptop",
    description: "High-end gaming laptop",
    quantity: 10,
    price: 1500.00,
  };

  const item = new inventoryItem(inventoryItemData);
  const savedinventoryItem = await item.save();

  expect(savedinventoryItem.id).toBeDefined();
  expect(savedinventoryItem.categoryId).toBe(item.categoryId);
  expect(savedinventoryItem.supplierId).toBe(item.supplierId);
  expect(savedinventoryItem.name).toBe(item.name);
  expect(savedinventoryItem.description).toBe(item.description);
  expect(savedinventoryItem.quantity).toBe(item.quantity);
  expect(savedinventoryItem.price).toBe(item.price);
});
it('should fail to create a inventory item with out the required fields', async()=>{
  const inventoryItemData = {
      name: "Laptop",
      description: "High-end gaming laptop", 
  };

  const item = new inventoryItem(inventoryItemData);

  let err
  try{
    await item.save();
  }catch(error){
    err = error;
  }
  expect(err).toBeDefined();
  expect(err.errors['price']).toBeDefined();
  expect(err.errors['quantity']).toBeDefined();
});
it('should faile to create an item with a name shorter than 3 characters', async()=>{
  const inventoryItemData = {
        categoryId: 1000,
        supplierId: 1,
        name: "La",
        description: "High-end gaming laptop",
        quantity: 10,
        price: 1500.00,
     
  };

  const item = new inventoryItem(inventoryItemData);
  let err;
  
  try{
    await item.save();
  }catch(error){
    err = error;
  }

  expect(err).toBeDefined();
  expect(err.errors['name']).toBeDefined();
  expect(err.errors['name'].message).toBe('Inventory Item must be at least 3 characters long')
});
it('should failed to create a inventory item name longer than 100 characters ', async()=>{
   const inventoryItemData = {
        categoryId: 1000,
        supplierId: 1,
        name: "La".repeat(101),
        description: "High-end gaming laptop",
        quantity: 10,
        price: 1500.00,
     
  };

  const item = new inventoryItem(inventoryItemData);
  let err;
  
  try{
    await item.save();
  }catch(error){
    err = error;
  }

  expect(err).toBeDefined();
  expect(err.errors['name']).toBeDefined();
  expect(err.errors['name'].message).toBe('Inventory Item name cannot exceed 100 Characters')
});
it('should test that only numbers are allowed for price', async()=>{
  const inventoryItemData = {
    categoryId: 1000,
    supplierId: 1,
    name: "Laptop",
    description: "High-end gaming laptop",
    quantity: 10,
    price: "invalidPrice", // Invalid data type
  };

  const item = new inventoryItem(inventoryItemData);
  let err;

  try {
    await item.save();
  } catch (error) {
    err = error;
  }

  expect(err).toBeDefined();
  expect(err.errors['price']).toBeDefined();
  expect(err.errors['price'].message).toContain('Cast to Number failed'); // Mongoose error message
});
});