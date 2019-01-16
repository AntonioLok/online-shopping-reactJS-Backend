const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

mongoose.connect('mongodb://user123:user123@ds135704.mlab.com:35704/shopping_site', { useNewUrlParser: true });
const dbconnection = mongoose.connection;

// Handle mongo error
dbconnection.on('error', console.error.bind(console, 'connection error:'));
dbconnection.once('open', () => {
  console.log('We are connected');
});

// Get product
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  Product.getProduct(id, (err, product) => {
    if (err) {
      res.json({ success: false, data: [] });
    } else {
      res.json({ success: true, data: product[0] });
    }
  });
});


// Get products
router.get('/products/:section/:type', (req, res) => {
  const { section, type } = req.params;
  Product.getProducts(section, type, (err, products) => {
    if (err) {
      res.json({ success: false, data: [] });
    } else {
      res.json({ success: true, data: products });
    }
  });
});

module.exports = router;
