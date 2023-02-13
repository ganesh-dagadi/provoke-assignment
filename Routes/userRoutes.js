const express = require("express")
const { signupUser  , loginUser} = require("../Controllers/userController")

const router = express.Router()

router.post("/" , signupUser)

router.post('/login' , loginUser)

module.exports = router