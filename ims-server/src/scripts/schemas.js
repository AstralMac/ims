/**
 * Author: Malcolm Abdullah
 * Date: February 16th, 2025
 * File:
 * Description:
 */


const addSupplierSchema = {
    type: 'object',
    properties: {
        supplierName: { type: 'string', minLength: 3, maxLength: 100 },
        contactInformation: { type: 'string', maxLength: 500 },
        address: { type: 'string', minLength: 1 }
    },
    required: ['supplierName', 'address'],
    additionalProperties: true
};

const updateSupplierSchema = {
    type: 'object',
    properties: {
        supplierName: { type: 'string', minLength: 3, maxLength: 100 },
        contactInformation: { type: 'string', maxLength: 500 },
        address: { type: 'string', minLength: 1 }
    },
    required: ['supplierName', 'address'],
    additionalProperties: true
};

const addCategorySchema = {
    type: 'object',
    properties: {
        categoryName: { type: 'string', minLength: 3, maxLength: 100 },
        description: { type: 'string', maxLength: 500 }
    },
    required: ['categoryName'],
    additionalProperties: false
};

const updateCategorySchema = {
    type: 'object',
    properties: {
        categoryName: { type: 'string', minLength: 3, maxLength: 100 },
        description: { type: 'string', maxLength: 500 }
    },
    required: ['categoryName'],
    additionalProperties: false
};

const addInventoryItemSchema = {
    type: 'object',
    properties: {
        name: { 
          type: 'string', 
          minLength:3, 
          maxLength: 100,
          },
        categoryId: { type: 'number' },
        supplierId: { type: 'number' },
        description: { type: 'string', maxLength: 500 },
        quantity: { type: 'number', minimum: 0 },
        price: { type: 'number', minimum: 0 },
        dateCreated: {type: 'string'}
    },
    required: ['name', 'categoryId', 'supplierId', 'quantity', 'price'],
    additionalProperties: true
};

const updateInventoryItemSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 3, maxLength: 100 },
        categoryId: { type: 'number' },
        supplierId: { type: 'number' },
        description: { type: 'string', maxLength: 500 },
        quantity: { type: 'number', minimum: 0 },
        price: { type: 'number', minimum: 0 },
        dateModified: {type:'string'}
    },
    additionalProperties: true
};

module.exports = {
    addSupplierSchema,
    updateSupplierSchema,
    addCategorySchema,
    updateCategorySchema,
    addInventoryItemSchema,
    updateInventoryItemSchema
};
