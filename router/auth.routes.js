const { Router } = require("express")
const { register, login } = require("../controller/auth.controller")



const AuthRouter = Router()

AuthRouter.post("/register", register)

AuthRouter.post("/login", login)

module.exports = AuthRouter