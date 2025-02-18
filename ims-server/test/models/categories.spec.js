/**
 * Author: Malcolm Abdullah
 * Date: February 14th, 2025
 * file: inventoryItems.spec.js
 * description: tests for Suppliers mongoose schema
 */

'use strict';

const mongoose = require('mongoose');
const {Categories, Counter} = require('../../src/models/categories');

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
  await Categories.deleteMany({});
  await Counter.deleteMany({});
});

//Close the database connection after all tests
afterAll(async()=>{
  await mongoose.connection.close(true);
  console.log('Database connection is closing');
});

//Test suite for Categories Model
describe('Categories Model Test', ()=>{
it('should create a category successfully', async()=>{
  const categoryData = {
    categoryName: 'Electronics',
    description: 'The latest gadgets and appliances',
  };
  const category = new Categories(categoryData);
  const savedCategory = await category.save();
  expect(savedCategory._id).toBeDefined();
  expect(savedCategory.name).toBe(categoryData.name)
  expect(savedCategory.description).toBe(categoryData.description);
});
it('should validate Category name correctly', async()=>{
  const categoryData = {
    categoryName: 'Electrom!',
    description: 'The latest and greatest gadgets'
  };
  const category = new Categories(categoryData);
  let err;
  try{
    await category.save();
  }catch (error){
    err = error; 
  }
  expect(err).toBeDefined();
  expect(err.errors['categoryName']).toBeDefined();
  expect(err.errors['categoryName'].message).toBe('Category name can only contain letters and spaces');
});
it('should auto-increment categoryId correctly', async()=>{
  const categoryData1 = {
    categoryName: 'Electronics',
    description: 'Newest and latest gadgets'
  };
  const categoryData2 = {
    categoryName: 'Home Goods',
    description: 'Home decor and Toiletries'
  }
  const category1 = new Categories(categoryData1);
  const savedCategory1 = await category1.save();
  const category2 = new Categories(categoryData2);
  const savedCategory2 = await category2.save();
  expect(savedCategory1.categoryId).toBe(1);
  expect(savedCategory2.categoryId).toBe(2);
});
});