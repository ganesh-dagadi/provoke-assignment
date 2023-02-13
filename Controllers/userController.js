const express = require("express")
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const db = require("../Config/firebase")
module.exports.signupUser = async(req , res , next)=>{
    try{
        const {username , password}= req.body
        if(!username || !password) return res.status(400).json({err : "Required parameters are missing"})

        //validate username is not taken
        const foundUser = await db.collection("users").where("username" , "==" , username).get()
        if (!foundUser.empty) return res.status(409).json({err : "Username is already taken"})
        //Hashing password
        const hashedPass = await bcrypt.hash(password , await bcrypt.genSalt(10))
        const newUser = new User(username , hashedPass)
        const savedUser = await db.collection('users').add({...newUser})
        res.status(200).json({msg : "User created. Please login" , savedUser})
    }catch(err){
        next(err.message)
    }
}

module.exports.loginUser = async(req , res , next)=>{
    try{
        const {username , password} = req.body;
        if(!username || !password) return res.status(400).json({err : "Required fields missing"})
        const foundUser = await db.collection("users").where("username" , "==" , username).limit(1).get()
        if(foundUser.empty) return res.status(404).json({err : "Provided username is invalid"})
        let foundUserDetails
        foundUser.forEach(user=>{
            foundUserDetails = {id : user.id , ...user.data()}
        })
        if(!bcrypt.compareSync(password , foundUserDetails.password)) return res.status(403).json({err : "Passwords dont match"})
        res.cookie( "auth_cookie", foundUserDetails.id , {
            expiresIn : 1000 * 60 * 300 ,   // 300 minutes
            httpOnly : true,
            sameSite : "strict"
        })

        res.status(200).json({msg : "Logged in "})
    }catch(err){
        next(err)
    }
}