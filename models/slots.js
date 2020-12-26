const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    selectedDate: {
        type: String,
        required: true
    },
    startTime:{
        type: String,
        required: true,
        unique: true
    },
    endTime:{
        type: String,
        required: true,
        unique: true
    },
    isBooked:{
        type: Boolean,
        required: true
    }
}, {timestamps: false});

module.exports = mongoose.model("Slot", slotSchema)