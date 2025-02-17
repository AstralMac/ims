/**
 * Author: Malcolm Abdullah
 * Date: February 16th, 2025
 * File: index.spec.js
 * description: Tests for "Create Inventory Item" API
 */

'use strict';
const request = require('supertest');
const app = require('../../../../src/app');
const {inventoryItem} = require('../../../../src/models/inventoryItem');

// Mock the Inventory Item schema Model
jest.mock('../../../../src/models/inventoryItem');

describe('POST /api/inventory', ()=> {
  it('should create an inventory item successfully', async() => {
    //Mock the saved method
    inventoryItem.prototype.save.mockResolvedValue({_id: '650c1f1e1c9d440000a1b1c1'});
    const response = await request(app).post('/api/inventory').send({
      name: 'Laptop',
      categoryId: 1000,
      supplierId: 1,
      description: 'High-end gaming laptop',
      quantity: 10,
      price: 1500.00
    });
    //for debugging
    console.log('response:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item was created successfully');
  });

  it('should return validation errors for invalid input', async() => {
    const response = await request(app).post('/api/inventory').send({
      name: 'Lp',
      categoryId: 1000,
      supplierId: 1,
      description: 'High-end gaming laptop',
      quantity: 10,
      price: 1500.00,

    });
      //for debugging
    console.log('response:', response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('data/name must NOT have fewer than 3 characters')
  });

  it('should return an error when price or quantity is negative', async () => {
  const response = await request(app).post('/api/inventory').send({
    name: 'Faulty Item',
    categoryId: 1000,
    supplierId: 1,
    description: 'Should fail',
    quantity: -5,
    price: -20.00
  });

  console.log('response:', response.body);
  expect(response.status).toBe(400);
  expect(response.body.message).toBe('data/quantity must be >= 0');
});

});