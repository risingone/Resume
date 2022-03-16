const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    dob: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        enum: ['under-graduate','graduate','post-graduate'],
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    skills: {
        type: String,
        enum: ['programmer', 'developer', 'data-analyst']
    }
})

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;