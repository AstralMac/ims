/**
 * Author: Jake Seever
 * Date: February 27th, 2025
 * File: index.spec.js
 * description: Tests for "Add Supplier" API
 */

"use strict";
const request = require("supertest");
const app = require("../../../../src/app");
const { Suppliers } = require("../../../../src/models/suppliers");

// Mock the Inventory Item schema Model
jest.mock("../../../../src/models/suppliers");

describe("POST /api/suppliers/add", () => {
  it("should add a supplier successfully", async () => {
    //Mock the saved method
    Suppliers.prototype.save.mockResolvedValue({
      _id: "650c1f1e1c9d440000a1b1c1",
    });
    const dateCreated = new Date().toISOString();
    const response = await request(app).post("/api/suppliers/create").send({
      supplierName: "Test", // Should successfully create this object.
      contactInformation: "715-299-9999",
      address: "123 Best Gadget Way",
    });
    //for debugging
    console.log("response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Supplier was added successfully");
  });

  it("should return validation errors for invalid input name of two letters", async () => {
    const response = await request(app).post("/api/suppliers/create").send({
      supplierName: "Te", // Name only two letters when 3 is the minimum.
      contactInformation: "715-299-9999",
      address: "123 Best Gadget Way",
    });
    //for debugging
    console.log("response:", response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "data/supplierName must NOT have fewer than 3 characters"
    );
  });

  it("should not save a supplier with blank name", async () => {
    const response = await request(app).post("/api/suppliers/create").send({
      supplierName: "Jake's Gadgets",
      contactInformation: "", // Missing the contactInformation
      address: "123 Best Gadget Way",
    });
    //for debugging
    console.log("response:", response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required fields");
  });
});
