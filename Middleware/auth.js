const db = require("../Config/firebase");

module.exports.authenticateReq = async (req, res , next)=>{
    try{
        const userId = req.cookies.auth_cookie;
        if(!userId) return res.status(401).json({err : "Login to view this resource"});
        const userDoc = await db.collection("users").doc(userId).get()
        console.log(userDoc.data())
        req.user = {...userDoc.data() , id : userDoc.id}
        next()
    }catch(err){
        next(err)
    }
}