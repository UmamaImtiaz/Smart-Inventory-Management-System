const Item = require('../models/itemModel');
const Order = require('../models/order');

const getDashboardStats = async (req, res) => {
  try {
    // 1. Basic counts
    const [totalProducts, totalOrders] = await Promise.all([
      Item.countDocuments(),
      Order.countDocuments()
    ]);

    // 2. Revenue calculation (case-insensitive status check)
    const revenueData = await Order.find({ status: /^completed$/i });
    const revenue = revenueData.reduce((acc, order) => acc + (order.total || 0), 0);

    // 3. Recent orders with proper field mapping
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 4. Top products aggregation (fixed field names)
    const topProductsAgg = await Order.aggregate([
      { $unwind: '$items' }, // Changed from orderItems to items
      {
        $group: {
          _id: '$items.item', // Match your schema field name
          totalSales: { $sum: '$items.quantity' },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
    ]);

    // 5. Product details with null checks
    const topProducts = await Promise.all(
      topProductsAgg.map(async (item) => {
        try {
          const product = await Item.findById(item._id);
          return {
            id: item._id,
            name: product?.name || 'Unknown Product',
            sales: item.totalSales,
          };
        } catch (error) {
          return {
            id: item._id,
            name: 'Product Not Found',
            sales: item.totalSales
          };
        }
      })
    );

    // 6. Response formatting with safe data access
    res.status(200).json({
      totalProducts,
      totalOrders,
      revenue,
      recentOrders: recentOrders.map(o => ({
        id: o._id,
        customer: o.user?.name || 'Guest', // Match your user reference field
        date: o.createdAt.toISOString().split('T')[0],
        total: o.total,
        status: o.status
      })),
      topProducts,
      // Implement actual trend calculations instead of hardcoded values
      trends: await calculateTrends() 
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production'
        ? 'Failed to load dashboard data'
        : error.message
    });
  }
};

// Implement actual trend calculations
async function calculateTrends() {
  // Add your trend calculation logic here
  return {
    productTrend: 5,
    orderTrend: -3,
    revenueTrend: 8
  };
}

module.exports = { getDashboardStats };