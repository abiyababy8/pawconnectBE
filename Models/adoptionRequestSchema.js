const mongoose = require('mongoose')
const adoptionRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    donation: {
        type: String,
        require: true
    },
    pet: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
})
const adoptionRequests = mongoose.model('adoptionRequests', adoptionRequestSchema)
module.exports = adoptionRequests