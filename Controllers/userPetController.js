const { findOneAndUpdate } = require("../Models/userPetsSchema")
const userPets = require('../Models/userPetsSchema')
const jwt=require('jsonwebtoken')


exports.addUserPets = async (req, res) => {
    const userId = req.payload
    const userPetImage = req.file.filename
    const { name, type, age, health, nextVetAppointment, vaccinations } = req.body
    try {
        const existingUserPet = await userPets.findOne({ name: name })
        if (existingUserPet) {
            res.status(406).json(`${name} already exists`)
            console.log("Pet already exists")
        }
        else {
            console.log("pet does not exists")
            const newPet = new userPets({
                name: name,
                type: type,
                age: age,
                health: health,
                nextVetAppointment: nextVetAppointment,
                vaccinations: vaccinations,
                userPetImage: userPetImage,
                userId: userId
            })
            await newPet.save()
            res.status(201).json(`${name} added successfully`)
        }
    }
    catch (err) {
        console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}
exports.getUserPets=async(req,res)=>{
     try {
        const userId = req.payload;
        const userpets = await userPets.find({ userId: userId })
        res.status(200).json(userpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}