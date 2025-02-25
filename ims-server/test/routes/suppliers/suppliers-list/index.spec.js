const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app');
const { Suppliers } = require('../../../../src/models/suppliers');

jest.mock('../../../../src/models/suppliers'); // Mocking the suppliers model

describe('Suppliers API', () => {
  describe('GET /api/suppliers', () => {
    it('should get all suppliers', async () => {
      Suppliers.find.mockResolvedValue([{ supplierName: 'Techsupplier' }]);
      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].supplierName).toBe('Techsupplier');
    });

    it('should handle errors', async () => {
      Suppliers.find.mockRejectedValue(new Error('Database error'));
      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(500);
    });

    it('should return an empty array when there are no suppliers', async () => {
      Suppliers.find.mockResolvedValue([]);
      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should handle errors', async () => {
      Suppliers.find.mockRejectedValue(new Error('Database error'));
      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });
});
