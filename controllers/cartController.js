const Cart = require('../models/cartModel');
const Food = require('../models/foodModel');

exports.addToCart = async (req, res) => {
  try {
    const { foodId } = req.body; // Get the foodId from the request body
    console.log('Received foodId:', foodId); // Log the received foodId

    // Check if foodId is a valid number
    if (!Number.isInteger(Number(foodId))) {
      return res.status(400).send('Invalid food ID');
    }

    // Check if the food item exists using the custom `id` field
    const foodItem = await Food.findOne({ id: Number(foodId) });
    if (!foodItem) {
      return res.status(404).send('Food item not found');
    }

    // Check if user is authenticated
    if (!req.session.userId) {
      return res.redirect('/auth/login'); // Redirect to login if not signed in
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId: req.session.userId });
    if (!cart) {
      cart = new Cart({ userId: req.session.userId, items: [] });
    }

    // Check if the item is already in the cart
    if (!cart.items.includes(Number(foodId))) {
      cart.items.push(Number(foodId));
      await cart.save();
    }

    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Server error');
  }
};

exports.getCart = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect('/auth/login'); // Redirect to login if not signed in
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId: req.session.userId });

    // Fetch food items corresponding to cart items
    const cartItems = cart ? await Food.find({ id: { $in: cart.items } }) : [];
    
    res.render('cart', { cartItems });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).send('Server error');
  }
};
