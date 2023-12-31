const { manageAsyncOps, fileModifier } = require("../../utils/index")
const { AdminAuthService } = require("./admin.service")
const { responseHandler } = require("../../core/response")
const { CustomError } = require("../../utils/errors")

const adminSignUpController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    AdminAuthService.adminSignUpService(req.body)
  )

  if (error) return next(error)

  if (!data?.success) return next(new CustomError(data.msg, 400, data))

  return responseHandler(res, 200, data)
}

const getAdminController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    AdminAuthService.getAdminService(req.query)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, 400, data))

  return responseHandler(res, 200, data)
}

const updateAdminController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    AdminAuthService.updateAdminService(req.body, req.params)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, 400, data))

  return responseHandler(res, 200, data)
}

const deleteAdminController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    AdminAuthService.deleteAdminService(req.params.id)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, 400, data))

  return responseHandler(res, 200, data)
}

module.exports = {
  adminSignUpController,
  updateAdminController,
  getAdminController,
  deleteAdminController,
}
