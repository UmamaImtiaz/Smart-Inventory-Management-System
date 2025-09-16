const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    photo: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avator.png",
    },

    phone: {
      type: String,
      default: "+234",
    },

    bio: {
      type: String,
      maxlength: [250, "Bio must not exceed 250 characters"],
      default: "bio",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Default role is "user"
    },

    loginLogs: [
      {
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
