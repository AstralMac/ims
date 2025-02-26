/**
 * Author: Malcolm Abdullah
 * Date: February 25th, 2025
 * File name: index.spec.js
 * Description: Tests for Supplier by ID API 
 */
'use strict';

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app');
const { Suppliers } = require('../../../../src/models/suppliers');

// Mock the Supplier model
jest.mock('../../../../src/models/suppliers');

describe('GET /api/suppliers/byid/:id', () => {
  it('should get supplier by ID', async () => {
    Suppliers.findById.mockResolvedValue({
      _id: '650c1f1e1c9d440000a145c2',
      supplierId: 1,
      supplierName: 'TechSupplier',
      contactInformation: '123-456-7890',
      address: '123 Tech Street',
      dateCreated: '2021-01-01T00:00:00.000Z',
    });

    const response = await request(app).get('/api/suppliers/byid/650c1f1e1c9d440000a145c2');

    console.log('response:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Supplier found');
    expect(response.body.item.supplierName).toBe('TechSupplier');
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app).get('/api/suppliers/byid/invalidID');

    console.log('response: ', response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid supplier ID');
  });

  it('should return 404 when supplier is not found', async () => {
    Suppliers.findById.mockResolvedValue(null);

    const response = await request(app).get('/api/suppliers/byid/650c1f1e1c9d440000a145c2');

    console.log('response:', response.body);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Supplier not found');
  });
});
