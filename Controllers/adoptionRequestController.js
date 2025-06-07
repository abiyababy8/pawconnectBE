const { findOneAndUpdate } = require('../Models/adoptionRequestSchema')
const adoptionRequests = require('../Models/adoptionRequestSchema')
const jwt = require('jsonwebtoken')

exports.addAdoptionRequest = async (req, res) => {
    const userId = req.payload;
    const { name, contact, donation, pet,status } = req.body
    try {
        const existingRequest = await adoptionRequests.findOne({ name: name, pet: pet })
        if (existingRequest) {
            res.status(406).json(`${name} has already submitted adoption request for ${pet}`)
        }
        else {
            const newRequest = new adoptionRequests({
                name: name,
                contact: contact,
                donation: donation,
                pet: pet,
                userId: userId,
                status:status,
            })
            await newRequest.save()
            const populatedRequest = await adoptionRequests.findById(newRequest._id).populate('pet');
            res.status(201).json(`${name} has submitted adoption request for ${populatedRequest.pet.name} successfully`)
        }
    }
    catch (err) {
        console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}
exports.getUserAdoptionRequest=async(req,res)=>{
    try {
        
        const userId = req.payload;
        const UserAdoptionRequests = await adoptionRequests.find({userId:userId}).populate('pet')
        res.status(200).json(UserAdoptionRequests)
    
        
    } catch (error) {
         console.log("Some Error occured:", err)
        res.status(401).json("Something happened")
    }
}