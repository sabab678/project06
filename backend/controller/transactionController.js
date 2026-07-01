import {Transaction} from '../model/dailyTransaction.model.js'
 
const createTransaction = async (req, res) => {
    const { date, income, expenses, note } = req.body

    const user = req.user

    // const transaction = tra

    try {
        const newTransaction = new Transaction({
            userId: req.user._id,
            income,
            expenses,
            note
        })
        return res.status(200).json({message:"add is successful"})
    }catch (error) {
        res.status(500).json({ message: "Error creating transaction", error })
    }
}


const getTransaction = async (req, res) => {

}


const updateTransaction = async (req, res) => {

}

export { createTransaction, getTransaction, updateTransaction }