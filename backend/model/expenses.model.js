import mongoose from "mongoose";


const expensesSchema = new mongoose.Schema({
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
    amount:{
        type: String,
        default:0
    },
    category: {
        type: String,
    },
    expensesFrom:{
        type:String,
        enum:['Cash', 'Card', 'Mobile Banking'],
        default: 'Cash'
    },
    note:{
        type: String,
        maxlength: [255, 'Note cannot be longer than 255 characters'], 
        trim: true         
    }
},{timestamps:true})

export const Expenses = mongoose.model('Expenses', expensesSchema)