const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    selectedDate: {
        type: Date,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    isBooked:{
        type: Boolean,
        required: true
    }
}, {timestamps: false});

module.exports = mongoose.model("Slot", slotSchema)