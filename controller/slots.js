const Slot = require('../models/slots')
const { errorHandler }  = require('../errorHandlers/dbErrorHandler');


exports.create = (req, res) => {
    const slot = new Slot(req.body);

    slot.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({data});
    });
}