import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance : {
        type: Number,
        required: true
    }

},{timestamps:true})

export const Balance = mongoose.model('Balance', balanceSchema)