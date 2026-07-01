import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: () => new Date().toISOString().split('T')[0]
    },
    income: {
        type: Number,
        default: 0
    },
    expenses: [{
        amount:{
            type: Number,
            default: 0
        },
        category: {
            type: String,
        }
        
    }
    ],
    note:{
        type:String,
        maxlength: [255, 'Note cannot be longer than 255 characters'], // <-- Sets the limit and a custom error message
        trim: true 
    }


}, { timestamps: true })

export const Transaction = mongoose.model('Transaction', transactionSchema) 