const { findOneAndUpdate } = require("../Models/userSchema")
const users = require('../Models/userSchema')
const jwt=require('jsonwebtoken')
//user registration
exports.registerUser=async (req,res)=>{
    const {username,email,phone,password}=req.body
    try{
        const existingUser = await users.findOne({ email: email })
        if (existingUser) {

            res.status(409).json("Account already exists. Please Login !!!")
        }
        else{
            console.log("User not found!!!")
            const newUser = new users({
                username: username,
                email: email,
                phone:phone,
                password: password
            })
            await newUser.save()
            res.status(201).json(`${username} Registered successfully`)
        }
    }
    catch(err){
        res.status(401).json("Register request failed due to", err)
    }
}
//user login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log("Inside login controller function", username, password);

    try {
        const existingUser = await users.findOne({ username: username, password: password });
         if (existingUser) {
            const token=jwt.sign({userId:existingUser._id},"supersecretkey")
            console.log("Token:",token)
            res.status(200).json({
                user_data:existingUser,
                jwt_token:token
            })
        }
        else {
            res.status(406).json("Login failed due to invalid email or password")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json("Login blocked due to:", err)
    }
}
// get logged in user details
exports.userDetails=async(req,res)=>{
  try{
      const userId = req.payload;
        const userDetails= await users.findOne({ _id: userId })
        res.status(200).json(userDetails)
  }
  catch(err){
    res.status(401).json(err)
  }
}