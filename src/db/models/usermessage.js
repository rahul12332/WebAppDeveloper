const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },

    phone:{
        type: Number,
        required:true,
        min:10
    },
    message:{
        type:String,
        minLength:3,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }
})

// we need collection in mongo

const User = mongoose.model('User', userSchema);

module.exports = User;