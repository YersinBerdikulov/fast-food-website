const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart); // Access cart with GET request
router.post('/add', cartController.addToCart); // Add items to cart with POST request

module.exports = router;
