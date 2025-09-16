const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Generate JWT Token
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT Secret is missing in environment variables");
  }

  return jwt.sign(
    { id: user._id, role: user.role }, // Include role
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Register User
const registerUser = asyncHandler(async (req, res) => {
  console.log("📩 Register Request Received:", req.body);

  const { name, email, password, photo, phone, bio } = req.body;

  // ✅ Check Required Fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // ✅ Validate Password Length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // ✅ Check if Email Already Exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  // ✅ Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ✅ Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    photo: photo || "https://i.ibb.co/4pDNDk1/avator.png",
    phone: phone || "",
    bio: bio || "",
  });

  // ✅ Send Response with JWT Token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
      token: generateToken(user._id), // JWT Token is generated here
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ✅ Login User
const loginUser = asyncHandler(async (req, res) => {
  console.log("🔑 Login Attempt:", req.body.email);

  const { email, password } = req.body;

  // ✅ Find User by Email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("No account found with this email");
  }

  // ✅ Compare Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  // ✅ Save Login Timestamp
  user.loginLogs.push({ timestamp: new Date() });
  await user.save(); // Save updated user login logs

  console.log("✅ User Logged In:", user.email);

  // ✅ Send Response with JWT Token
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    photo: user.photo,
    phone: user.phone,
    bio: user.bio,
    token: generateToken(user._id), // JWT Token is generated here
    loginLogs: user.loginLogs, // Sending login logs as part of the response
  });
});

module.exports = {
  registerUser,
  loginUser,
};
