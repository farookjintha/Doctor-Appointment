const Appointment = require('../models/appointment');
const Slot = require('../models/slots');
const { errorHandler }  = require('../errorHandlers/dbErrorHandler');


exports.create = (req, res) => {

    console.log("Req From Appointment: ", req.body)
    
    const appointment = new Appointment(req.body);

    Slot.find({"startTime": req.body.startTime, "isBooked": false})
    .exec((err, response) => {
        console.log("Response from Slot: ", response);
        let count = response.length;
        if(count){
            appointment.save((err, result) => {
                console.log("Error: ", err)
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                res.json({result});
            });
            Slot.updateOne({_id: response[0]._id}, {$set:{isBooked: true}}, (err, result) => {
                console.log("Error: ", err)
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                res.json({result});
            })
        }
    });
}