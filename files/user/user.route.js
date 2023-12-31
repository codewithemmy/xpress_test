const { isAuthenticated } = require("../../utils")
const { uploadManager } = require("../../utils/multer")
const {
  adminSignUpController,
  getAdminController,
  updateAdminController,
  deleteAdminController,
} = require("../admin/admin.controller")
const userRoute = require("express").Router()

//controller files
const {
  createUserController,
  userLoginController,
} = require("../user/controllers/user.controller")

userRoute.route("/login").post(userLoginController)

userRoute.post(
  "/",
  uploadManager("image").single("image"),
  createUserController
)

userRoute.use(isAuthenticated)
//verifiers route
userRoute.route("/verifier").post(adminSignUpController)
userRoute.route("/verifier").get(getAdminController)
userRoute.route("/verifier/:id").patch(updateAdminController)
userRoute.route("/verifier/:id").delete(deleteAdminController)

module.exports = userRoute
