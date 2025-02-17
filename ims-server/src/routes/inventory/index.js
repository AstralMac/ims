/**
 * Author: Jake Seever
 * Date: 2/15/25
 * File: index.js
 * Description: IMS Inventory API's
 */

'use strict';

const express = require('express');
const createError = require('http-errors');
const inventoryItem = require('../../models/inventoryItem');

const router = express.Router();

router.get('/:itemId', async(req, res, next)=> {
    try{
        const plant = await inventoryItem.findOne({_id: req.params.itemId});
        console.log(inventoryItem);
        res.send(inventoryItem);
    }catch(err){
        console.error(`Error while getting item: ${err}`);
        next(err);
    }
});
