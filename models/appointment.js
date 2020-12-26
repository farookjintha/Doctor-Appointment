const mongoose = require('mongoose');



const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    selectedDate:{
        type: String,
        ref: 'Slot',
        required: true
    },
    startTime: {
        type: String,
        ref: 'Slot',
        required: true
    }
}, {timestamps: false});

module.exports = mongoose.model("Appointment", appointmentSchema);