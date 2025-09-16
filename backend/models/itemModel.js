const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["In Stock", "Low Stock", "Out of Stock"], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
