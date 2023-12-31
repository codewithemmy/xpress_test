const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    partner: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      default: "awaiting-approval",
    },
  },
  { timestamps: true }
)

const admin = mongoose.model("Admin", adminSchema, "admin")

module.exports = { Admin: admin }
