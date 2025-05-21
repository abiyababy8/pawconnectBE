const { findOneAndUpdate } = require('../Models/adoptPetSchema')
const adoptPets = require('../Models/adoptPetSchema')
const jwt = require('jsonwebtoken')
exports.addAdoptPet = async (req, res) => {
    const userId = req.payload
    const image = req.file.filename
    const { name, type, description, owner, lastLocation } = req.body
    try {
        const existingLostPet = await adoptPets.findOne({ name: name })
        if (existingLostPet) {
            res.status(406).json(`${name} already exists`)
            console.log("Pet already exists")
        }
        else {
            console.log("pet does not exists")
            const newAdoptPet = new adoptPets({
                name: name,
                type: type,
                description: description,
                owner: owner,
                lastLocation: lastLocation,
                image: image,
                userId: userId
            })
            await newAdoptPet.save()
            res.status(201).json(`${name} added successfully`)
        }
    }
    catch (err) {
        console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}
exports.getAdoptPet = async (req, res) => {
    try {
        const userId = req.payload;
        const adoptpets = await adoptPets.find({ userId: userId })
        res.status(200).json(adoptpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}