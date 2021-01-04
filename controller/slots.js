const Slot = require('../models/slots')
const { errorHandler }  = require('../errorHandlers/dbErrorHandler');


exports.create = (req, res) => {
    // console.log("Req: ", req.body)
    const slot = new Slot(req.body);
    Slot.find(
        {
            $or: [
                {
                    $and: [
                        {
                            "startTime": {
                                $lte: new Date(new Date(req.body.startTime))
                            }
                        }, {
                            "endTime": {
                                $gte: new Date(new Date(req.body.startTime))
                            }
                        }
                    ]
                }, {
                    $and: [
                        {
                            "startTime": {
                                $lte: new Date(new Date(req.body.endTime))
                            }
                        }, {
                            "endTime": {
                                $gte: new Date(new Date(req.body.endTime))
                            }
                        }
                    ]
                }, {
                    $and: [
                        {
                            "startTime": {
                                $gte: new Date(new Date(req.body.startTime))
                            }
                        }, {
                                "endTime": {
                                    $lte: new Date(new Date(req.body.endTime))
                                }
                            }
                        ]
                }
                ]
        }
    ).exec((err, response) => {
        let count = response.length;
        if(!count){
            slot.save((err, data) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
        
                res.json({data});
            });
        }
    })

    
}

exports.list =(req, res) => {
    Slot.find().exec((err, slots) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(slots);
    });
}

exports.listSearch = (req, res) => {
    const query = {}
    // console.log("Req: ",req);

        Slot.find(req.query, (err, products) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        })
    }
