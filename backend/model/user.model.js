import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        maxlength: [20, 'User name should be in 16 letter']    
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxlength: [30, 'email should be in 20 letter']    
    },
    password:{
        type:String,
        required:true,
        maxlength: [100, 'User name should be in 16 letter']
    },
    verified:{
        type: Boolean,
        default:false
    },
    otp:{
        type:Number,
    }

},{timestamps:true})


export const User = mongoose.model('User',userSchema)