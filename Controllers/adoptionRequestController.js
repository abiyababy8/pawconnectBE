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
exports.updateAdoptionRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const updatedRequest = await adoptionRequests.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('pet');

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Adoption request not found' });
        }

        res.status(200).json({
            message: 'Status updated successfully',
            updatedRequest
        });
    } catch (err) {
        console.error('Error updating adoption request status:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Delete adoption request
exports.deleteAdoptionRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await adoptionRequests.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Adoption request not found' });
        }

        res.status(200).json({ message: 'Adoption request deleted successfully' });
    } catch (err) {
        console.error('Error deleting adoption request:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};