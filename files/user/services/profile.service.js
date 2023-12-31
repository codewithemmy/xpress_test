const { default: mongoose } = require("mongoose")
const {
  hashPassword,
  tokenHandler,
  verifyPassword,
  queryConstructor,
  sanitizePhoneNumber,
  generateOtp,
} = require("../../../utils")
const { UserSuccess, UserFailure } = require("../user.messages")
const { UserRepository } = require("../user.repository")
const { LIMIT, SKIP, SORT } = require("../../../constants")
const {
  ProfileFailure,
  ProfileSuccess,
} = require("../messages/profile.messages")

class ProfileService {
  static async updateProfileService(id, payload) {
    const { body, image } = payload
    delete body.email
    delete body.password

    const userprofile = await UserRepository.updateUserDetails(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          profileImage: image,
          ...body,
        },
      }
    )

    if (!userprofile) return { success: false, msg: UserFailure.UPDATE }

    return {
      success: true,
      msg: UserSuccess.UPDATE,
    }
  }

  static async profileImageService(payload, id) {
    const { image } = payload

    const userprofile = await UserRepository.updateUserDetails(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          profileImage: image,
        },
      }
    )

    if (!userprofile) return { success: false, msg: UserFailure.UPDATE }

    return {
      success: true,
      msg: UserSuccess.UPDATE,
    }
  }

  static async getUserService(userPayload) {
    const { error, params, limit, skip, sort } = queryConstructor(
      userPayload,
      "createdAt",
      "User"
    )
    if (error) return { success: false, msg: error }

    const allUsers = await UserRepository.findAllUsersParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (allUsers.length < 1) return { success: false, msg: UserFailure.FETCH }

    return {
      success: true,
      msg: UserSuccess.FETCH,
      data: allUsers,
      length: allUsers.length,
    }
  }

  static async getUserProfileService(payload) {
    const user = await UserRepository.findSingleUserWithParams(
      {
        ...payload,
      },
      { password: 0 }
    )

    if (!user) return { success: false, msg: UserFailure.FETCH }

    return {
      success: true,
      msg: UserSuccess.FETCH,
      data: user,
    }
  }
}

module.exports = { ProfileService }
