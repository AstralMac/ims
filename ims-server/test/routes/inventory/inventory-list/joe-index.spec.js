const mongoose = require('mongoose');
const InventoryItem  = require('../../src/models/inventoryItem');

// Connect to a test database
beforeAll(async () => {
  const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority';
  try {
    await mongoose.connect(connectionString, {
      dbName: 'gms'
    });
    console.log('Connection to the database instance was successful');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
});

// Clear the database before each test
beforeEach(async () => {
  await InventoryItem.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  console.log('Database connection closed');
});

describe('InventoryItem Model Test', () => {
  it('should create an inventory item successfully', async () => {
    const itemData = {
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      status: 'In Stock'
    };
    const item = new InventoryItem(itemData);
    const savedItem = await item.save();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.name).toBe(itemData.name);
    expect(savedItem.category).toBe(itemData.category);
    expect(savedItem.quantity).toBe(itemData.quantity);
    expect(savedItem.status).toBe(itemData.status);
  });

  it('should fail to create an inventory item without required fields', async () => {
    const itemData = {
      name: 'Laptop'
    };
    const item = new InventoryItem(itemData);
    let err;
    try {
      await item.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors['category']).toBeDefined();
    expect(err.errors['quantity']).toBeDefined();
    expect(err.errors['status']).toBeDefined();
  });

  it('should update an inventory item\'s status successfully', async () => {
    const itemData = {
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      status: 'In Stock'
    };
    const item = new InventoryItem(itemData);
    const savedItem = await item.save();
    savedItem.status = 'Out of Stock';
    const updatedItem = await savedItem.save();
    expect(updatedItem.status).toBe('Out of Stock');
  });

  it('should fail to create an inventory item with a name shorter than 3 characters', async () => {
    const itemData = {
      name: 'LP',
      category: 'Electronics',
      quantity: 10,
      status: 'In Stock'
    };
    const item = new InventoryItem(itemData);
    let err;
    try {
      await item.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors['name']).toBeDefined();
    expect(err.errors['name'].message).toBe('Item name must be at least 3 characters');
  });

  it('should fail to create an inventory item with a name longer than 100 characters', async () => {
    const itemData = {
      name: 'L'.repeat(101),
      category: 'Electronics',
      quantity: 10,
      status: 'In Stock'
    };
    const item = new InventoryItem(itemData);
    let err;
    try {
      await item.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors['name']).toBeDefined();
    expect(err.errors['name'].message).toBe('Item name cannot exceed 100 characters');
  });

  it('should fail to create an inventory item with an invalid category', async () => {
    const itemData = {
      name: 'Laptop',
      category: 'InvalidCategory',
      quantity: 10,
      status: 'In Stock'
    };
    const item = new InventoryItem(itemData);
    let err;
    try {
      await item.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors['category']).toBeDefined();
    expect(err.errors['category'].message).toBe('`InvalidCategory` is not a valid enum value for path `category`.');
  });

  it('should fail to create an inventory item with an invalid status', async () => {
    const itemData = {
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      status: 'InvalidStatus'
    };
    const item = new InventoryItem(itemData);
    let err;
    try {
      await item.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors['status']).toBeDefined();
    expect(err.errors['status'].message).toBe('`InvalidStatus` is not a valid enum value for path `status`.');
  });
});
