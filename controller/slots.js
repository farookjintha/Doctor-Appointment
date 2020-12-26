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
    //create query object to hold search value and category
    const query = {}
    console.log("Req: ",req);

    // if(req.query.search){
    //     query.name = {$regex: req.query.search, $options: 'i'}

    //     if(req.query.category && req.query.category != 'All'){
    //         query.category = req.query.category
    //     }
    
        Slot.find(req.query, (err, products) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        })
    }
