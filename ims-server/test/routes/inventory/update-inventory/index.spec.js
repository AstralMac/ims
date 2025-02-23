/**
 * Author: Malcolm Abdullah
 * Date: February 20th, 2025
 * File: index.spec.js
 * description: Tests for "Update Inventory Item" API
 */
'use strict';

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app');
const { inventoryItem } = require('../../../../src/models/inventoryItem');
const { updateInventoryItemSchema } = require('../../../../src/scripts/schemas');

// Mock the Inventory Item schema Model
jest.mock('../../../../src/models/inventoryItem');

describe('PATCH /api/inventory/:id', () => {
  it('should update the desired fields of an item', async () => {
    inventoryItem.findByIdAndUpdate.mockResolvedValue({
      _id: '650c1f1e1c9d440000a1b1c1',
      price: 1000.00
    });

    const response = await request(app).patch('/api/inventory/update/650c1f1e1c9d440000a1b1c1').send({
      price: 1000.00
    });

    console.log('response:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item was updated successfully');
    expect(response.body.item.price).toBe(1000.00);
  });

  it('should return errors for invalid input', async () => {
    const response = await request(app).patch('/api/inventory/update/650c1f1e1c9d440000a1b1c1').send({
      price: 'one-thousand dollars', // Invalid price
      description: "12345" // Should be a string
    });

    console.log('response:', response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('data/price must be number');
  });

  it('should return errors for item not found', async () => {
    inventoryItem.findByIdAndUpdate.mockResolvedValue(null); // Simulate item not found

    const response = await request(app).patch('/api/inventory/update/650c1f1e1c9d440000a145c2').send({
      name: 'Faulty Item',
      categoryId: 1000,
      supplierId: 1,
      description: 'Should fail',
      quantity: 5,
      price: 20.00
    });

    console.log('response:', response.body);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item not found');
  });
});
