const { login, register } = require("../controllers/user")

const userRouter = require("express").Router() 

userRouter.post("/auth/login", login) 
userRouter.post("/auth/register", register)

module.exports = {
    userRouter
}