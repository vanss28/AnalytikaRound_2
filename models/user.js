const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const validator = require('validator')

const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    gmail:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid e-mail id")
            }
        }
    },
    mobilee:{
        type: Number,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required:true,
    },
   
});

module.exports = mongoose.model('User', userSchema);