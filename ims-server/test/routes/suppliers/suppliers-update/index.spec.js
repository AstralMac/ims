/**
 * Author: Jake Seever
 * Date: March 3rd, 2025
 * File: index.spec.js
 * description: Tests for "Update Supplier" API
 */

"use strict";
const request = require("supertest");
const app = require("../../../../src/app");
const { Suppliers } = require("../../../../src/models/suppliers");

// Mock the Inventory Item schema Model
jest.mock("../../../../src/models/suppliers");

describe("POST /api/suppliers/update", () => {
  it("should update a supplier successfully", async () => {
    //Mock the saved method
    Suppliers.prototype.save.mockResolvedValue({
      supplierID: "17",
      supplierName: "Test", // Should successfully update this object.
      contactInformation: "715-299-9999",
      address: "123 Best Gadget Way"
    });
    const dateModified = new Date().toISOString();
    const response = await request(app).patch("/api/suppliers/update").send({
      supplierID: "17",
      supplierName: "Test 123", // Should successfully update this object.
      contactInformation: "715-299-9990",
      address: "123 Best Gadget Way"
    });
    //for debugging
    console.log("response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Supplier was updated successfully");
  });

  it("should return validation errors for invalid input name of two letters", async () => {
    const response = await request(app).patch("/api/suppliers/update").send({
      supplierName: "Te", // Name only two letters when 3 is the minimum for the update.
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

  it("should not save a supplier with blank contact information", async () => {
    const response = await request(app).patch("/api/suppliers/update").send({
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
