require('dotenv').config()
const express = require('express')
require('./DB/connection')
const cors=require('cors')
const router=require('./Routes/router')
const myServer = express()
myServer.use(cors())
myServer.use(express.json())
myServer.use(router)
const PORT = 4003;
myServer.listen(PORT,()=>{
    console.log(`My server is running in PORT ${PORT}`)
})
myServer.get('/',(req,res)=>{
    res.send("HELLO, Your Server is running in PORT 4003")
})