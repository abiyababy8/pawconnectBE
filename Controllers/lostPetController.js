const { findOneAndUpdate } = require('../Models/lostPetSchema')
const lostPets = require('../Models/lostPetSchema')
const jwt = require('jsonwebtoken')
exports.addLostPets = async (req, res) => {
    const userId = req.payload
    const lostPetImage = req.file.filename
    const { name, type, description, owner, location, status } = req.body
    try {
        const existingLostPet = await lostPets.findOne({ name: name, owner: owner })
        if (existingLostPet) {
            res.status(406).json(`${name} already listed by you`)
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
exports.getLostPets = async (req, res) => {
    try {
        //const userId = req.payload;
        const lostpets = await lostPets.find()
        res.status(200).json(lostpets)
    }
    catch (err) {
        res.status(401).json(err)
    }

}
exports.updateLostPetLocation = async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;

    try {
        if (!location) {
            return res.status(406).json({ message: 'Location is required' });
        }

        const updatedPet = await lostPets.findByIdAndUpdate(
            id,
            { location },
            { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Lost pet not found' });
        }

        res.status(200).json({
            message: 'Location updated successfully',
            updatedPet
        });
    } catch (error) {
        console.error('Error updating lost pet location:', error);
        res.status(401).json({ message: 'Internal server error' });
    }
};
exports.updateLostPetStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        const updatedPet = await lostPets.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Lost pet not found' });
        }

        res.status(200).json({
            message: 'status updated successfully',
            updatedPet
        });
    } catch (error) {
        console.error('Error updating lost pet location:', error);
        res.status(401).json({ message: 'Internal server error' });
    }
};
exports.deleteLostPet = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPet = await lostPets.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).json({ message: 'Lost pet not found' });
        }

        res.status(200).json({ message: `${deletedPet.name} deleted successfully` });
    } catch (error) {
        console.error('Error deleting lost pet:', error);
        res.status(401).json({ message: 'Internal server error' });
    }
};
exports.getUserLostPets = async (req, res) => {
    try {
        const userId = req.payload;
        const lostpets = await lostPets.find({ userId: userId })
        res.status(200).json(lostpets)
    }
    catch (err) {
        res.status(401).json(err)
    }
}