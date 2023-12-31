const { Admin } = require("../../files/admin/admin.model")

const createAdminValidator = {
  fullName: {
    notEmpty: true,
    errorMessage: "Full name cannot be empty",
  },
  email: {
    notEmpty: true,
    errorMessage: "Email cannot be empty",
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  password: {
    notEmpty: true,
    errorMessage: "Password cannot be empty",
  },
}

module.exports = { createAdminValidator }
