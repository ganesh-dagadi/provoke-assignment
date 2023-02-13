const express = require("express")
const { createPost , getPosts, getPostById , getPostOfUser , updatePost , deletePost} = require("../Controllers/postController")
const { authenticateReq } = require("../Middleware/auth")

const router = express.Router()

router.post("/" , authenticateReq , createPost)

//get all posts
router.get("/" , getPosts)

router.get("/:id" , getPostById)

router.get("/user/all" , authenticateReq , getPostOfUser)

router.put("/:id" , authenticateReq , updatePost)

router.delete("/:id" , authenticateReq , deletePost)

module.exports = router