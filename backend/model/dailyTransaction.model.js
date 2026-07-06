import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        required: true
        // type: Date,
        // default: () => new Date().toISOString().split('T')[0]
    },
    income : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Income"
    },
    expenses:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Expenses"
    },
    note:{
        type:String,
        maxlength: [255, 'Note cannot be longer than 255 characters'], // <-- Sets the limit and a custom error message
        trim: true 
    }


}, { timestamps: true })

export const Transaction = mongoose.model('Transaction', transactionSchema) 