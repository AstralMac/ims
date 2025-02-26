const express = require('express');
const router = express.Router();
const { Suppliers } = require('../../../models/suppliers'); // Correct import with capital "S"

router.get('/list', async (req, res, next) => { 
  try { 
    const suppliers = await Suppliers.find({}); // Use Suppliers model
    res.send(suppliers);
  } catch (err) {
    console.error(`Error while getting suppliers: ${err}`);
    next(err);
  }
});

module.exports = router;
