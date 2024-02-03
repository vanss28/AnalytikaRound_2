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
    age: { 
        type: Number,
        required: true,
        validate(value) {
            if (value < 18) {
                throw new Error("Must be at least 18 years old");
            }
        }
    },
    gender: { // Added 'gender' field
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
   
});

module.exports = mongoose.model('User', userSchema);