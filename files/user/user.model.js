const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
    },
    businessAddress: {
      type: String,
    },
    businessEmail: { type: String },
    businessPhone: { type: String },
    accountNumber: { type: Number },
    houseNumber: { type: Number },
    streetNumber: { type: Number },
    city: { type: String },
    state: { type: String },
    contactName: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    image: {
      type: String,
    },
    password: { type: String },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const user = mongoose.model("User", userSchema, "user")

module.exports = { User: user }
