const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // Ensure `id` is unique
    name: String,
    veg: Boolean,
    price: Number,
    description: String,
    quantity: Number,
    img: String,
    sizeandcrust: Array
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
