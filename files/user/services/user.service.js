const mongoose = require("mongoose")
const { hashPassword, tokenHandler, verifyPassword } = require("../../../utils")

const { UserSuccess, UserFailure } = require("../user.messages")
const { UserRepository } = require("../user.repository")

class UserService {
  static async createUser(payload) {
    const { image, body } = payload

    const { businessEmail, businessPhone } = body

    const userExist = await UserRepository.validateUser({
      $or: [{ businessEmail }, { businessPhone }],
    })

    if (userExist)
      return {
        success: false,
        msg: `business email or business phone already exist`,
      }

    const user = await UserRepository.create({
      ...body,
      image,
      isVerified: true,
      password: await hashPassword(body.password),
    })

    if (!user._id) return { success: false, msg: `unable to register user` }

    return {
      success: true,
      msg: `user registered successfully`,
    }
  }

  static async userLogin(payload) {
    const { email, password } = payload

    //return result
    const userProfile = await UserRepository.findSingleUserWithParams({
      businessEmail: email,
    })

    if (!userProfile) return { success: false, msg: UserFailure.USER_EXIST }

    const isPassword = await verifyPassword(password, userProfile.password)

    if (!isPassword) return { success: false, msg: UserFailure.PASSWORD }

    let token

    userProfile.password = undefined

    token = await tokenHandler({ ...userProfile })

    const user = {
      _id: userProfile._id,
      businessName: userProfile.businessName,
      businessAddress: userProfile.businessAddress,
      businessEmail: userProfile.businessEmail,
      businessPhone: userProfile.businessPhone,
      ...token,
    }

    //return
    return {
      success: true,
      msg: UserSuccess.FETCH,
      data: user,
    }
  }
}
module.exports = { UserService }
