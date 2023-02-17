const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    notes: [{
        type: Array,
        required: true,
    }],
    university: {
        type: mongoose.Types.ObjectId,
        ref: 'university',
    }
});

const Student = mongoose.model('student', studentSchema);

const universitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    private:{
        type: Boolean,
        required: true
    },
    address: [{
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }],
});

const University = mongoose.model('university', universitySchema);

module.exports = { Student, University }