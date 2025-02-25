/**
 * Author: Malcolm Abdullah
 * Date: Februaury 25th, 2025
 * File name: index.spec.js
 * description: Tests for Supplier by ID API 
 */
'use strict;'

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../../../src/app');
const {Suppliers} = require('../../../../src/models/suppliers');
const {schema} = require ('../../../../src/scripts/schemas');

//Mock the Supplierr entry schema Model
jest.mock('../../../../src/models/suppliers');


describe('GET /api/suppliers', () => {
  it('should get supplier by ID', async () => {
    Suppliers.findById.mockResolvedValue('650c1f1e1c9d440000a1b1c1');

    const response = (await request(app).get('api/suppliers/list/650c1f1e1c9d440000a1b1c1')).send({
      supplierId: '',
      supplierName: '',
      contactInformation: '',
      address: '',
      dateCreated: ''
    });

    console.log('response:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Supplier not found');
  });

  it('should return erros for invalid input', async () => {

  });

  it('should return errors when not found', async () => {

  });
})