const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");
const { protect, adminOnly } = require("../middleWare/authMiddleware");

// ✅ Create (POST) multiple items
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Please provide an array of items" });
    }

    const newItems = await Item.insertMany(items);
    res.status(201).json({
      message: `${newItems.length} items added successfully`,
      items: newItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get (GET) all items with filters + search + pagination
router.get("/", protect, async (req, res) => {
  try {
    const { keyword = "", category, status, page = 1, limit = 10 } = req.query;

    const query = {
      name: { $regex: keyword, $options: "i" },
    };

    if (category) query.category = category;
    if (status) query.status = status;

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Item.countDocuments(query);

    res.status(200).json({ total, page: Number(page), limit: Number(limit), items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Bulk Update (PUT)
router.put("/", protect, adminOnly, async (req, res) => {
  try {
    const updates = req.body.items;
    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: "Invalid data format. Expected an array." });
    }

    const updatedItems = await Promise.all(
      updates.map(async (item) => {
        return await Item.findByIdAndUpdate(item._id, item, { new: true });
      })
    );

    res.status(200).json({ message: `${updatedItems.length} items updated successfully`, items: updatedItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Bulk Delete
router.delete("/", protect, adminOnly, async (req, res) => {
  try {
    const { itemIds } = req.body;
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({ error: "Invalid request. Provide an array of item IDs." });
    }

    const deletedItems = await Item.deleteMany({ _id: { $in: itemIds } });
    res.status(200).json({ message: `${deletedItems.deletedCount} items deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Single item update by ID (for admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Single item delete by ID (for admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
