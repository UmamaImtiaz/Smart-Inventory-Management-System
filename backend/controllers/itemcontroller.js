const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");

// Get all items with optional search, filter, pagination
const getItems = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, keyword = "", category, status } = req.query;

  const query = {
    name: { $regex: keyword, $options: "i" },
    ...(category && { category }),
    ...(status && { status }),
  };

  const items = await Item.find(query)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Item.countDocuments(query);

  res.status(200).json({ total, items });
});

// Update single item (admin only)
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) throw new Error("Item not found");

  Object.assign(item, req.body);
  const updated = await item.save();

  res.status(200).json(updated);
});

// Delete single item (admin only)
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) throw new Error("Item not found");

  await item.deleteOne();
  res.status(200).json({ message: "Item deleted" });
});

module.exports = {
  getItems,
  updateItem,
  deleteItem,
};
