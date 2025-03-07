/**
 * Author: Malcolm Abdullah
 * Date: March 5th, 2025
 * File: index.spec.js
 * description: Test suite for the delete supplier API
 */

'use strict';

// Import the needed modules and dependencies
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app');
const {Suppliers} = require('../../../../src/models/suppliers');

//Mock the supplier model
jest.mock('../../../../src/models/suppliers');

describe('Delete /api/suppliers/Id', () => {
  it('Should delete a supplier entry successfully', async () => {
    Suppliers.deleteOne.mockResolvedValue({deletedCount: 1});

    //Log to the console for debugging
    console.log('Mock deleteOne called:', Suppliers.deleteOne.mock);

    //mock the response of the deletion
    const response = await request(app).delete('/api/suppliers/delete/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Supplier entry has been deleted');
    expect(response.body.id).toBe('1');
  });

  it('should handle error if item is not found', async () => {
    Suppliers.deleteOne.mockResolvedValue({deletedCount: 0});

    const response = await request(app).delete('/api/suppliers/delete/12');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Supplier entry not found');
    //console.log(response);
  });

  it('should handle errors during deletion', async () => {
    Suppliers.deleteOne.mockRejectedValue(new Error ('Error in Database'));
    
    const response = await request(app).delete(`/api/suppliers/delete/546`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error in Database');
  });
});