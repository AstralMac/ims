const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app'); // Adjust the path to app.js
const { inventoryItem } = require('../../../../src/models/inventoryItem');
jest.mock('../../../../src/models/inventoryItem'); // Mock the InventoryItem model

describe('DELETE /api/inventory/:Id', () => {
  it('should delete an inventory item successfully', async () => {
    inventoryItem.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const response = await request(app).delete('/api/inventory/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inventory item deleted successfully');
    expect(response.body.Id).toBe('1');
  });

  it('should handle errors during deletion', async () => {
    inventoryItem.deleteOne.mockRejectedValue(new Error('Database error'));
    const response = await request(app).delete('/api/inventory/1');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Database error');
  });
});
