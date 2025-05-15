const mongoose = require('mongoose')
const userPetsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    health: {
        type: String,
        require: true
    },
    nextVetAppointment: {
        type: String,
        require: true
    },
    vaccinations: {
        type: String,
        require: true
    },
    userPetImage: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
})
const userPets = mongoose.model('userPets', userPetsSchema)
module.exports = userPets