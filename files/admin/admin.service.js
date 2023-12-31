const mongoose = require("mongoose")
const { AdminRepository } = require("./admin.repository")
const { queryConstructor } = require("../../utils/index")
const { authMessages } = require("./messages/auth.messages")
const { adminMessages } = require("./messages/admin.messages")
const { uploadImageManager } = require("../../utils/multer")

class AdminAuthService {
  static async adminSignUpService(data) {
    const admin = await AdminRepository.fetchAdmin({
      phone: data.phone,
    })

    if (admin) {
      return { success: false, msg: `phone number already existed` }
    }

    const verifier = await AdminRepository.create({
      ...data,
    })

    if (!verifier)
      return {
        success: false,
        msg: `unable to add verifier`,
      }

    return {
      success: true,
      msg: `Verifiers added successfully`,
      data: verifier,
    }
  }

  static async getAdminService(userPayload) {
    const { error, params, limit, skip, sort } = queryConstructor(
      userPayload,
      "createdAt",
      "Admin"
    )
    if (error) return { success: false, msg: error }

    const getAdmin = await AdminRepository.findAdminParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (getAdmin.length < 1)
      return { success: true, msg: `not found`, data: [] }

    return {
      success: true,
      msg: `successful`,
      data: getAdmin,
    }
  }

  static async updateAdminService(data, params) {
    const admin = await AdminRepository.updateAdminDetails(
      { _id: new mongoose.Types.ObjectId(params.id) },
      {
        ...data,
      }
    )

    if (!admin)
      return {
        success: false,
        msg: `unable to update`,
      }

    return {
      success: true,
      msg: `successful`,
      admin,
    }
  }

  static async deleteAdminService(id) {
    const admin = await AdminRepository.deleteAdminDetails({
      _id: new mongoose.Types.ObjectId(id),
    })

    if (!admin)
      return {
        success: false,
        msg: `admin not available to delete`,
      }

    return {
      success: true,
      msg: "successful",
    }
  }
}

module.exports = { AdminAuthService }
