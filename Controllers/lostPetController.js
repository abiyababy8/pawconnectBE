const { findOneAndUpdate } = require('../Models/lostPetSchema')
const lostPets = require('../Models/lostPetSchema')
const jwt = require('jsonwebtoken')
exports.addLostPets = async (req, res) => {
    const userId = req.payload
    const lostPetImage = req.file.filename
    const { name, type, description, owner, location, status } = req.body
    try {
        const existingLostPet = await lostPets({ name: name })
        if (existingLostPet) {
            res.status(406).json(`${name} already exists`)
            console.log("Pet already exists")
        }
        else {
            console.log("pet does not exists")
            const newLostPet = new lostPets({
                name: name,
                type: type,
                description: description,
                owner: owner,
                location: location,
                status: status,
                lostPetImage: lostPetImage,
                userId: userId
            })
            await newLostPet.save()
            res.status(201).json(`${name} added successfully`)
        }
    }
    catch (err) {
        console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}