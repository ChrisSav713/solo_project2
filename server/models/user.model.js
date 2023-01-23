const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    first:{
        type:String,
        required: [true, 'First name must be included'],
        minLength: [3, 'User - First name must be at least 3 characters']
    },
    last: {
        type:String,
        required: [true, 'Last name must be included'],
        minLength: [3, , 'User - Last name must be at least 3 characters']
    },
    email: {
        type:String,
        trim: true,
        required: [true, 'Email must be included'],
        unique:true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'User - Not a valid Email format'
        ]
    },
    password:{
        type:String,
        trim:true,
        required: [true, 'Password must be included'],
        minLength: [8, 'Password must be at least 8 characters'],
        match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'User - Password must contian at least 1 uppercase, 1 lowercase, and 1 number and special character'
        ]
    }
}, {timestamps:true})


UserSchema.pre('save', async function(next){
    const rounds = 10
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(rounds))
    this.password = hash
    next()
    })

module.exports = mongoose.model('User', UserSchema);