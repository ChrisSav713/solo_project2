const mongoose = require('mongoose');

const urlTypeSchema = new mongoose.Schema({ id: {type: Number }, url:{type:String}});

const nameTypeSchema = new mongoose.Schema({ id: {type:Number }, name:{type:String}})

const GameSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:[true]
    },
    name: {
        type:String,
        required: [true, "Field is required"],
        minLength: [3, 'Name must be at least 3 characters'],
    },
    url: {
        type:String,
        required: [true, "Field is required"],
        minLength: [3, 'url must be at least 3 characters'],
    },
    summary: {
        type:String,
        required: [false]
    },
    tags:[Number],
    screenshots: [urlTypeSchema],
    platforms: [nameTypeSchema],
    genres:[nameTypeSchema],
    cover:[urlTypeSchema],
    artworks:[urlTypeSchema]
}, {timestamps:true})

module.exports = mongoose.model('Game', GameSchema);