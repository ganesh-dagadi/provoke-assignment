require('dotenv').config()

const express = require("express"),
      cors = require("cors"),
      {json , urlencoded} = express

const app = express()

//firebase config
const db = require("./Config/firebase")
app.use(cors())
app.use(json())
app.use(urlencoded({extended : false}));



const port = process.env.PORT || 5000

app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`)
})