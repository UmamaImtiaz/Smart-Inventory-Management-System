const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { protect } = require('../middleWare/authMiddleware');
const Order = require('../models/order');
const Item = require('../models/itemModel');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post(
  '/',
  protect,
  [
    check('items', 'At least one item is required').isArray({ min: 1 }),
    check('items.*.item', 'Invalid item ID').isMongoId(),
    check('items.*.quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
    check('shippingAddress.street', 'Street is required').notEmpty(),
    check('shippingAddress.city', 'City is required').notEmpty(),
    check('shippingAddress.state', 'State is required').notEmpty(),
    check('shippingAddress.zip', 'Zip code is required').isPostalCode('any')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let total = 0;
      const items = [];

      // Validate and prepare item data
      for (const item of req.body.items) {
        const dbItem = await Item.findById(item.item);

        if (!dbItem) {
          return res.status(400).json({ errors: [{ msg: `Item not found with ID: ${item.item}` }] });
        }

        if (dbItem.stock < item.quantity) {
          return res.status(400).json({ errors: [{ msg: `Insufficient stock for item: ${dbItem.name}` }] });
        }

        total += dbItem.price * item.quantity;
        items.push({
          item: item.item,
          quantity: item.quantity,
          price: dbItem.price
        });
      }

      // Save new order
      const order = new Order({
        user: req.user.id,
        items,
        total,
        shippingAddress: req.body.shippingAddress
      });

      const savedOrder = await order.save();

      // Update item stock
      await Promise.all(items.map(async (item) => {
        await Item.findByIdAndUpdate(
          item.item,
          { $inc: { stock: -item.quantity } }
        );
      }));

      res.status(201).json(savedOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: 'Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

module.exports = router;
