// server.js or index.js
const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
require("dotenv").config();

// Import Routes and Middleware
const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoutes");
const orderRoute = require("./routes/orderRoutes");
const dashboardRoute = require("./routes/dashboard");
const errorHandler = require("./middleWare/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 6087;

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(cors()); // Enable CORS

// API Routes
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/dashboard", dashboardRoute); 

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
