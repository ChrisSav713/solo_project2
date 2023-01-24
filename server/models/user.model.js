const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[false]
    },
    firstname:{
        type:String,
        required: [false, 'First name must be included'],
        minLength: [3, 'User - First name must be at least 3 characters']
    },
    lastname: {
        type:String,
        required: [false, 'Last name must be included'],
        minLength: [3, , 'User - Last name must be at least 3 characters']
    },
    email: {
        type:String,
        trim: true,
        required: [true, 'Email must be included'],
        unique:true,
        match: [
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'User - Not a valid Email format'
        ]
    },
    password:{
        type:String,
        trim:true,
        required: [true, 'Password must be included'],
        minLength: [8, 'Password must be at least 8 characters'],
        match:[
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'User - Password must contian at least 1 uppercase, 1 lowercase, and 1 number and special character'
        ]
    },
    location:{
        type:String,
        required:[false]
    },
    bio:{
        type:String,
        required:[false]
    },
    avatar:{
        type:String,
        required:[false]
    }
}, {timestamps:true})


UserSchema.pre('save', async function(next){
    const rounds = 10
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(rounds))
    this.password = hash
    next()
    })

module.exports = mongoose.model('User', UserSchema);