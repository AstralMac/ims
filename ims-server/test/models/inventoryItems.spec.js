/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: inventoryItems.spec.js
 * description: tests for inventory Items mongoose schema
 */

'use strict';

const mongoose = require('mongoose');
const { inventoryItems } = require('../../src/models/inventoryItems');

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
  await inventoryItems.deleteMany({})
});

//Close the database connection after all tests
afterAll(async()=>{
  await mongoose.connection.close();
  console.log('Database connection is closing');
});

//Test suite for inventoryItems Model
describe('Inventory Item Model Test', ()=>{
it('', async()=>{});
it('', async()=>{});
it('', async()=>{});
});