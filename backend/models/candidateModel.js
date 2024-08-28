const mongoose = require('mongoose');

const candidate = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNo: { type: String, required: true },
    dob: { type: Date, required: true },
    experienceInMonths: { type: String, required: true },
    resumeTitle: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    currentEmployer: { type: String,  },
    currentDesignation: { type: String,  }
});

const Candidate = mongoose.model('candidateSchema',candidate);
module.exports = Candidate;



