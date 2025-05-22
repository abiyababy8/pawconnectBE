const { findOneAndUpdate } = require('../Models/adoptionRequestSchema')
const adoptionRequests = require('../Models/adoptionRequestSchema')
const jwt = require('jsonwebtoken')

exports.addAdoptionRequest = async (req, res) => {
    const userId = req.payload;
    const { name, contact, donation, pet } = req.body
    try {
        const existingRequest = await adoptionRequests.findOne({ name: name }, { pet: pet })
        if (existingRequest) {
            res.status(406).json(`${name} has already submitted adoption request for ${pet}`)
        }
        else {
            const newRequest = new adoptionRequests({
                name: name,
                contact: contact,
                donation: donation,
                pet: pet,
                userId: userId
            })
            await newRequest.save()
            res.status(201).json(`${name} has submitted adoption request for ${pet} successfully`)
        }
    }
    catch (err) {
        console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}