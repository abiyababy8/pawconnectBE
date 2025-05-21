const mongoose = require('mongoose')
const adoptPetSchema = new mongoose.Schema({
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
    lastLocation: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
})
const adoptPets = mongoose.model('adoptPets', adoptPetSchema)
module.exports = adoptPets