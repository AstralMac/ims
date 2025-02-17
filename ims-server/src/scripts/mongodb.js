/**
 * Author:
 * Date: 
 * File:
 * Description
 */

'use strict';
/*
const mongoose = require('mongoose');

//Connection to the database
beforeAll(async ()=> {
  const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';
  try{
    await mongoose.connect(connectionString,{
      dbName: 'ims',
      useNewUrlParser: true,
      useUnifiedTopology: true
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
  await mongoose.connection.close();
  console.log('Database connection is closing');
});

module.exports = mongoConnectionString;*/