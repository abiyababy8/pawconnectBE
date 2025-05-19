const mongoose = require('mongoose')
const lostPetSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    lostPetImage: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
})
const lostPets = mongoose.model('lostPets', lostPetSchema)
module.exports = lostPets