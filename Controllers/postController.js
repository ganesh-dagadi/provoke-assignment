const Post = require("../Models/Post")
module.exports.createPost = async (req , res ,next)=>{
    try{
        const {title , descp} = req.body
        if(!title || !descp) return res.status(400).json({err : "Required parameters are missing"});
        req.body.userId = req.user.id
        const newPost = new Post(title , descp); // validating data in class constructor

    }catch(err){

    }
}