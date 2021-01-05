const Appointment = require('../models/appointment');
const Slot = require('../models/slots');
const { errorHandler }  = require('../errorHandlers/dbErrorHandler');


exports.create = (req, res) => {

    // console.log("Req From Appointment: ", req.body)
    
    const appointment = new Appointment(req.body);

    Slot.find({"startTime": req.body.startTime, "isBooked": false})
    .exec((err, response) => {
        // console.log("Response from Slot: ", response);
        let count = response.length;
        if(!count){
            res.status(400).send("No slot available at the selected time!!!")
        }
        if(count){
            appointment.save((err, result) => {
                // console.log("Error: ", err)
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                // res.json({result});
                Slot.updateOne({_id: response[0]._id}, {$set:{isBooked: true}}, (err, result) => {
                    // console.log("Error: ", err)
                    if(err){
                        return res.status(400).json({
                            error: err
                        });
                    }
                    res.send("Appointment booked successfully!!");
                })
            });
            
        }
    });
}


exports.list =(req, res) => {
    Appointment.find().exec((err, slots) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(slots);
    });
}

exports.listSearch = (req, res) => {
    //create query object to hold search value and category
    const query = {}
    // console.log("Req: ",req);
        Appointment.find(req.query, (err, products) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        })
    }
