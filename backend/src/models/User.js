const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // 🔥 Password Reset Fields
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

// HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// MATCH PASSWORD
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

// 🔥 GENERATE RESET TOKEN
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetToken = token;
  this.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // valid 10 min

  return token;
};

module.exports = mongoose.model("User", userSchema);
