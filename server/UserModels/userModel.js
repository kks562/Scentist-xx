const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
});

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  cart: [cartItemSchema],
});

const userModel = mongoose.model('Scentist', UserSchema);

module.exports = userModel;
