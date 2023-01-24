const Game = require('../models/game.model')
const bcrypt = require('bcrypt');

module.exports.getOne = (req, res) => {
    Game.findOne({_id:req.params.id})
        .then(item => res.json(item))
        .catch(err => res.json(err));
}

module.exports.getAll = (req, res) => {
    Game.find({}).collation({locale:"en"}).sort({type:1}).exec(function(err, items) {
        if(err) {
            return res.json(err)
        } else {
            return res.json(items)
        }
    })
}

module.exports.updateOne = (req, res) => {
    Game.findByIdAndUpdate({ _id: req.params.id}, req.body, {runValidators:true})
    .then(item => res.json(item))
    .catch(err => res.json(err))
    }

module.exports.deleteOne = (req, res) => {
    Game.findByIdAndDelete({ _id: req.params.id})
    .then(item => res.json(item))
    .catch(err => res.json(err))
}

async function checkExists(fieldIn, valueIn) {
    const exists = await Game.exists({[fieldIn]: valueIn})
    console.log([fieldIn + valueIn])
    if(exists !== null) {
        console.log(JSON.stringify(exists))
        return true  
    }
    else {
        console.log(JSON.stringify(exists))
        return false  
    } 
}

module.exports.createOne = async (req, res) => {
        console.log(req.body)
        Game.create(req.body)
            .then((item) => res.json(item))
            .catch((err) => res.json(err))
}