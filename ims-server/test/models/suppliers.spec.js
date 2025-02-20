/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: inventoryItems.spec.js
 * description: tests for Suppliers mongoose schema
 */

'use strict';

const mongoose = require('mongoose');
const { Suppliers  } = require('../../src/models/suppliers');

//Connection to the database
beforeAll(async ()=> {
  const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';
  try{
    await mongoose.connect(connectionString,{
      dbName: 'ims',
    });
    console.log('Connection to the database instance was successful.')
  }catch (err){
    console.error(`MongoDB connection error: ${err}`);
  }
});

//Clear database before each test
beforeEach(async()=>{
  await Suppliers.deleteMany({});
});

//Close the database connection after all tests
afterAll(async()=>{
  await mongoose.connection.close(true);
  console.log('Database connection is closing');
});



//Test suite for inventoryItems Model
describe('Supplier Model Test', ()=>{
it('should fail to create a Supplier name with a name shorter than 3 characters', async()=>{
  const supplierData ={
    supplierName: 'So',
    contactInformation: 'Email: samplesupplier@ex.com',
    address: '3142 Broadway Ave, New York, NY'
  };
  const supplier = new Suppliers(supplierData);
  let err;
  try{
    await supplier.save();
  }catch (error){
    err= error;
  }
  expect(err).toBeDefined();
  expect(err.errors['supplierName']).toBeDefined();
  expect(err.errors['supplierName'].message).toBe('Supplier name must be at least 3 characters long');
});
it('should fail to create a category with a name longer than 100 characters', async()=>{
  const supplierData ={
    supplierName: 'So'.repeat(150),
    contactInformation: 'Email: samplesupplier@ex.com',
    address: '3142 Broadway Ave, New York, NY'
  };
  const supplier = new Suppliers(supplierData);
  let err;
  try{
    await supplier.save();
  }catch (error){
    err= error;
  }
  expect(err).toBeDefined();
  expect(err.errors['supplierName']).toBeDefined();
  expect(err.errors['supplierName'].message).toBe('Supplier name cannot exceed 100 characters');
});
it('should fail to create a garden with a contact information longer than 500 characters', async()=>{
  const supplierData ={
    supplierName: 'SoSo Electronics',
    contactInformation: 'Email: samplesupplier@ex.com'.repeat(501),
    address: '3142 Broadway Ave, New York, NY'
    };
  const supplier = new Suppliers(supplierData);
  let err;
  try {
    await supplier.save();
  } catch (error) {
    err = error;
  }
  expect(err).toBeDefined();
  expect(err.errors['contactInformation']).toBeDefined();
  expect(err.errors['contactInformation'].message).toBe('Contact information cannot exceed 500 characters');
});
});