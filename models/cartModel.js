const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: Number }] // Store food `id` as numbers
});

module.exports = mongoose.model('Cart', cartSchema);
