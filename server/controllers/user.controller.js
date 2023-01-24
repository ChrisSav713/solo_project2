const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) => {
    var isError = false
    var messageBack = {
        "name":"ValidationError",
        "message":"Validation Failed",
        "errors":{}
    }
    var findUser = {}

    findUser = await User.findOne({"email":req.body.email})

    if(!findUser) {
        isError = true
        console.log("Email address not found")
        messageBack["errors"]["email"] = {
            "name":"ValidationError", 
            "message":"Email address not found"
        }
    } else {
        let match = await bcrypt.compare(req.body.password, findUser.password)

        if(!match) {
            isError = true
            messageBack["errors"]["password"] = {
                "name":"ValidationError", 
                "message":"Password is invalid"
            }
        }
    }
    
    if(isError) {
        console.log("Returning error messages")
        res.status(200).json(messageBack)
    }
    else {
        console.log("Login Success")
        res.status(200).send('Login Success')
    }
}

module.exports.getOne = (req, res) => {
    User.findOne({_id:req.params.id})
        .then(item => res.json(item))
        .catch(err => res.json(err));
}

module.exports.getAll = (req, res) => {
    User.find({}).collation({locale:"en"}).sort({type:1}).exec(function(err, items) {
        if(err) {
            return res.json(err)
        } else {
            return res.json(items)
        }
    })
}


module.exports.createOne = (req, res) => {

    console.log('createOne Launched')
        const user = {email:req.body.email, password:req.body.password}
        console.log(user)
        console.log('creating')
        User.create(user)
            .then((item) => res.json(item))
            .catch((err) => res.json(err))

}

module.exports.comefindme = async (req, res) => {
    console.log('server side api request')
    console.log(req.body.searchOptions)
    const {token, endpoint, fields, search, where, limit, offset, sort } = req.body.searchOptions
    let requestOptions = {
        method: 'POST',
        url: 'https://api.igdb.com/v4/games',
        headers: {
            ['Client-ID']: `x4rniov57q0741nf6ptq41ohvlvrfs`,
            'Authorization': `Bearer ${token}`,
        },
        body: [
            `fields ${fields};`,
            `search ${search};`, 
            `where ${where};`,
            `limit ${limit};`,
            `offset ${offset};`,
            `sort ${sort};`
        ]
    }
    console.log('Request Options')
    console.log(requestOptions)
    
    const result = await fetch(`https://api.igdb.com/v4${endpoint}`,  requestOptions)
    
    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(data => { return (data) })
    .catch(err => console.warn(err));
    
    console.log('fetch finished, returning data to client')
    console.log(result)
    res.status(200).send(result)
    }
    

module.exports.updateOne = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id}, req.body, {runValidators:true})
    .then(item => res.json(item))
    .catch(err => res.json(err))
    }

module.exports.deleteOne = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id})
    .then(item => res.json(item))
    .catch(err => res.json(err))
}

function checkExists(fieldIn, valueIn) {
    const exists = User.exists({[fieldIn]: valueIn})
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