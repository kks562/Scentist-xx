const express = require('express');
const router = express.Router();
const User = require('./UserModels/userModel');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');

const authMiddleware = (req, res, next) => {
  console.log('authMiddleware called');

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Token missing in header');
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', decoded);

    req.userId = decoded.userId;  // or whatever payload property you use
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// Get cart items for a specific user (no auth required here, but you can add if needed)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.cart || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product to cart (auth required)
router.post('/add', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { product } = req.body;
console.log('Received product:', req.body.product);

  if (!product || !product.productId) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(item => item.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ ...product, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product from the cart (auth required)
router.delete('/:itemId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.params.itemId;

   const user = await User.findById(new mongoose.Types.ObjectId(userId)); // correct use of 'new'

    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the item from the cart array
    user.cart = user.cart.filter(item => item._id.toString() !== itemId);

    await user.save();

    res.json({ message: 'Item removed from cart', cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
