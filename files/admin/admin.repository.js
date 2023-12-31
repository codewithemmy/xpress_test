const mongoose = require("mongoose")
const { Admin } = require("../admin/admin.model")

class AdminRepository {
  static async create(body) {
    return Admin.create(body)
  }

  static async fetchAdmin(body) {
    const admin = await Admin.findOne({ ...body })
    return admin
  }

  static async findAdminParams(userPayload) {
    const { limit, skip, sort, search, ...restOfPayload } = userPayload

    const users = await Admin.find(
      {
        ...restOfPayload,
      },
      { password: 0 }
    )
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return users
  }

  static async updateAdminDetails(query, params) {
    return Admin.findOneAndUpdate(
      { ...query },
      { $set: { ...params } },
      { new: true, runValidators: true }
    )
  }

  static async deleteAdminDetails(query) {
    return Admin.findByIdAndDelete({ ...query })
  }
}

module.exports = { AdminRepository }
