// 1) import mongoose
const mongoose = require('mongoose')
//url used to connect with mongodb atlas
const connectionString = process.env.DATABASE_URL
//connect with mongodb
mongoose.connect(connectionString).then((res) => {
    console.log("MongoDB Connected Successfully!!!")
}).catch((err) => {
    console.log(err)
})