<<<<<<< Updated upstream
'use strict';
const request = require('supertest');
const app = require('../../../../src/app');
const {inventoryItem} = require('../../../../src/models/inventoryItem');

// Mock the Inventory Item schema Model
jest.mock('../../../../src/models/inventoryItem');
=======
/*const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app'); // Adjust the path to app.js
const inventoryItem = require('../../../../src/models/inventoryItem');
jest.mock('../../../../src/models/inventoryItem'); // Mock the InventoryItem model
>>>>>>> Stashed changes

describe('Inventory API', () => {
  describe('GET /api/inventory', () => {
    it('should get all inventory items', async () => {
      inventoryItem.find.mockResolvedValue([{ name: 'laptop' }]); // Mock the find method
      const response = await request(app).get('/api/inventory');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].name).toBe('laptop');
    });

    it('should handle errors', async () => {
      inventoryItem.find.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).get('/api/inventory');
      expect(response.status).toBe(500);
    });
  });
 

  /*describe('POST /api/inventory', () => {
    it('should create an inventory item successfully', async () => {
      inventoryItem.prototype.save.mockResolvedValue({ Id: 1 }); // Mock the save method
      const response = await request(app).post('/api/inventory').send({
        categoryId: 1000,
        supplierId: 1,
        name: 'Widget',
        quantity: 10,
        price: 15.5,
        description: 'Test item',
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Inventory item created successfully');
    });

    it('should return validation errors for invalid data', async () => {
      const response = await request(app).post('/api/inventory').send({
        name: 'Wd', // Invalid: too short
        quantity: -1, // Invalid: negative quantity
        price: -10.5, // Invalid: negative price
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('PATCH /api/inventory/:Id', () => {
    it('should update an inventory item successfully', async () => {
      InventoryItem.findOne.mockResolvedValue({
        set: jest.fn(),
        save: jest.fn().mockResolvedValue({ itemId: 1 }),
      }); // Mock the findOne and save methods
      const response = await request(app).patch('/api/inventory/1').send({
        name: 'Updated Widget',
        quantity: 15,
        price: 20.0,
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Inventory item updated successfully');
    });

    it('should return validation errors for invalid data', async () => {
      const response = await request(app).patch('/api/inventory/1').send({
        name: 'Up', // Invalid: too short
        quantity: -5, // Invalid: negative quantity
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
<<<<<<< Updated upstream
  });

  describe('DELETE /api/inventory/:itemId', () => {
    it('should delete an inventory item successfully', async () => {
      InventoryItem.deleteOne.mockResolvedValue({ deletedCount: 1 }); // Mock the deleteOne method
      const response = await request(app).delete('/api/inventory/1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Inventory item deleted successfully');
    });

    it('should handle errors', async () => {
      InventoryItem.deleteOne.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).delete('/api/inventory/1');
      expect(response.status).toBe(500);
    });
  });
});
=======
  });*/
>>>>>>> Stashed changes
