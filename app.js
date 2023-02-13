require('dotenv').config()

const express = require("express"),
      cors = require("cors"),
      cookieParser = require("cookie-parser"),
      {json , urlencoded} = express

const app = express()

//firebase config
const db = require("./Config/firebase")
app.use(cors())
app.use(json())
app.use(urlencoded({extended : false}));
app.use(cookieParser())

//User routes handles authentication
const userRoutes = require("./Routes/userRoutes")
app.use('/user' , userRoutes)

const postsRoutes = require("./Routes/postRoutes")
app.use("/post" , postsRoutes)
const port = process.env.PORT || 5000
app.use((err , req ,res , next)=>{
    console.log(err)
    res.status(500).json({err : err})
})

app.all("*" , (req ,res)=>{
    res.status(404).json({err : "Resource not found"})
})
app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`)
})