const express = require('express');
const router = express.Router();
const { inventoryItem } = require('../../../../src/models/inventoryItem');

// Route to delete an inventory item by ID
router.delete('/:Id', async (req, res, next) => {
  try {
    const item = await inventoryItem.deleteOne({ _id: req.params.Id });
    if (item.deletedCount === 1) {
      res.send({
        message: 'Inventory item deleted successfully',
        Id: req.params.Id,
      });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error(`Error while deleting inventory item: ${err}`);
    next(err); // Pass the error to the next middleware
  }
});

module.exports = router;
