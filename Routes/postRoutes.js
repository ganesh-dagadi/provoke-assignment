const express = require("express")
const { createPost } = require("../Controllers/postController")
const { authenticateReq } = require("../Middleware/auth")

const router = express.Router()

router.post("/" , authenticateReq , createPost)

module.exports = router