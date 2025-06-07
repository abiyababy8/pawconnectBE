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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adoptPets',
        required: true
    },
    userId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})
const adoptionRequests = mongoose.model('adoptionRequests', adoptionRequestSchema)
module.exports = adoptionRequests