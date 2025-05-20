const { findOneAndUpdate } = require("../Models/userPetsSchema.js")
const userPets = require('../Models/userPetsSchema.js')
const jwt = require('jsonwebtoken')


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
exports.getUserPets = async (req, res) => {
    try {
        const userId = req.payload;
        const userpets = await userPets.find({ userId: userId })
        res.status(200).json(userpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
exports.editUserPets = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { name, type, age, health, nextVetAppointment, vaccinations, userPetImage } = req.body
    const uploadpetimage = req.file ? req.file.filename : userPetImage
    try {
        const updatePet = await userPets.findByIdAndUpdate({ _id: id }, {
            name: name,
            type: type,
            age: age,
            health: health,
            nextVetAppointment: nextVetAppointment,
            vaccinations: vaccinations,
            userPetImage: uploadpetimage,
            userId: userId
        },
            {
                new: true  //used to define update
            })
        await updatePet.save()
        res.status(200).json(updatePet)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
exports.deleteUserPets = async (req, res) => {
    const {id} = req.params
    try {
        const deletePet = await userPets.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePet)
    }
    catch (err) {
        res.status(401).json(err)
    }
}