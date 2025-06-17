const { findOneAndUpdate } = require('../Models/adoptPetSchema')
const adoptPets = require('../Models/adoptPetSchema')
const jwt = require('jsonwebtoken')
exports.addAdoptPet = async (req, res) => {
    const userId = req.payload
    const image = req.file.filename
    const { name, type, description, owner, lastLocation, status } = req.body
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
                userId: userId,
                status: status,
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
        //const userId = req.payload;
        const adoptpets = await adoptPets.find()
        res.status(200).json(adoptpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
exports.getUserAdoptPetList = async (req, res) => {
    try {
        const userId = req.payload;
        const useradoptpets = await adoptPets.find({ userId: userId })
        res.status(200).json(useradoptpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
exports.updateAdoptPetStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const updatedPet = await adoptPets.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Adoptable pet not found' });
        }

        res.status(200).json({
            message: 'Status updated successfully',
            updatedPet
        });
    } catch (error) {
        console.error('Error updating adoptable pet status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete adopt pet listing
exports.deleteAdoptPet = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPet = await adoptPets.findByIdAndDelete(id);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Adoptable pet not found' });
        }

        res.status(200).json({ message: 'Adoptable pet deleted successfully' });
    } catch (err) {
        console.error('Error deleting adoptable pet:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};