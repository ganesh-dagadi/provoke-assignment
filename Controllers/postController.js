const db = require("../Config/firebase");
const Post = require("../Models/Post")
module.exports.createPost = async (req , res ,next)=>{
    try{
        const {title , descp} = req.body
        if(!title || !descp) return res.status(400).json({err : "Required parameters are missing"});
        const newPost = new Post(title , descp); // validating data in class constructor
        newPost.userId = req.user.id;
        const savedPost = await db.collection("posts").add({...newPost})
        res.status(200).json({msg : "Successfully created a post" , savedPost : await (await savedPost.get()).data()})
    }catch(err){
        next(err)
    }
}

module.exports.getPosts = async (req , res, next)=>{
    try{
        const postsSnap = await db.collection("posts").get();
        const posts = []
        postsSnap.forEach(post=>{
            posts.push({...post.data() , id : post.id})
        })
        return res.status(200).json({posts})
    }catch(err){
        next(err)
    }
}

module.exports.getPostById = async (req , res , next)=>{
    try{
        const postId = req.params.id
        const foundPost = await db.collection("posts").doc(postId).get()
        if(!foundPost.exists) return res.status(404).json({err : "Post not found"})
        return res.status(200).json({foundPost : foundPost.data()})
    }catch(err){
        next(err)
    }
}

module.exports.getPostOfUser = async (req , res , next)=>{
    try{
        const userId = req.user.id
        const postsSnap = await db.collection("posts").where("userId" , "==" , userId).get()
        const posts = []
        postsSnap.forEach(post=>{
            posts.push({...post.data() , id : post.id})
        })
        return res.status(200).json({posts})
    }catch(err){
        next(err)
    }
}

module.exports.updatePost = async (req, res , next)=>{
    try{
        //ensure logged in user has permission to update
        const loggedInUser = req.user.id
        const postSnap = db.collection("posts").doc(req.params.id)
        const postData = await postSnap.get()
        if(!postData.exists) return res.status(404).json({err : "Post not found"})
        if(postData.data().userId != loggedInUser) return res.status(403).json({err : "You are not authorized to perform this operation"})

        //passed
        await postSnap.update(req.body);
        res.status(200).json({msg : "Post has been updated"});
    }catch(err){
        next(err)
    }
}

module.exports.deletePost = async(req,res,next)=>{
    try{
        const loggedInUser = req.user.id
        const postSnap = db.collection("posts").doc(req.params.id)
        const postData = await postSnap.get()
        if(!postData.exists) return res.status(404).json({err : "Post not found"})
        if(postData.data().userId != loggedInUser) return res.status(403).json({err : "You are not authorized to perform this operation"})

        await postSnap.delete()
        return res.status(200).json({msg : "Post has been deleted"})
    }catch(err){
        next(err)
    }
}