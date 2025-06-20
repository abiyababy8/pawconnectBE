const { findOneAndUpdate } = require("../Models/userSchema.js")
const users = require('../Models/userSchema.js')
const jwt = require('jsonwebtoken')
//user registration
exports.registerUser = async (req, res) => {
    const { name, username, email, phone, password, role } = req.body
    try {
        const existingUser = await users.findOne({ email: email })
        if (existingUser) {

            res.status(409).json("Account already exists. Please Login !!!")
        }
        else {
            // console.log("User not found!!!")
            const newUser = new users({
                name: name,
                username: username,
                email: email,
                phone: phone,
                password: password,
                role: role
            })
            await newUser.save()
            res.status(201).json(`${username} Registered successfully`)
        }
    }
    catch (err) {
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
            const token = jwt.sign({ userId: existingUser._id }, "supersecretkey")
            console.log("Token:", token)
            res.status(200).json({
                user_data: existingUser,
                jwt_token: token
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
exports.userDetails = async (req, res) => {
    try {
        const userId = req.payload;
        const userDetails = await users.findOne({ _id: userId })
        res.status(200).json(userDetails)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
exports.allUsers = async (req, res) => {
    try {
        const userDetails = await users.find()
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userdata = req.body;

        const updatedUser = await users.findByIdAndUpdate(id, { ...userdata }, { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
};
exports.editUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updatedUser = await users.findByIdAndUpdate(id, { role }, { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteUser)
    }
    catch (err) {
        res.status(401).json(err)
    }

}