import { Balance } from '../model/balance.model.js'
import { Transaction } from '../model/dailyTransaction.model.js'
import { Expenses } from '../model/expenses.model.js'
import { Income } from '../model/income.model.js'

// const createTransaction = async (req, res) => {
//     const { date, income, expenses, note } = req.body

//     const user = req.user

//     // const transaction = tra

//     const preTran =await Transaction.find({userId:req.user._id}).select('date')
//     console.log(preTran)

//     let serverDate = new Date().toISOString().split("T")[0];

//     let day = serverDate.split('-')[2]

//     if (date === serverDate){
//         console.log(true)
//     }

//     console.log(serverDate)
//     console.log(date)

//     try {
//         const newTransaction = new Transaction({
//             userId: req.user._id,
//             date: serverDate,
//             income,
//             expenses,
//             note
//         })
//         // await newTransaction.save()

//         return res.status(200).json({message:"add is successful"})
//     }catch (error) {
//         res.status(500).json({ message: "Error creating transaction", error })
//     }
// }


const createExpenses = async (req, res) => {
    try {
        const { date, amount, category, expensesFrom, note } = req.body


        let balance = await Balance.findOne({ userId: req.user._id })
        // console.log(balance)

        if (balance === null) {
            const currentBalance = await Balance.create({ userId: req.user._id, balance: -amount })
        } else {
            await Balance.findOneAndUpdate(
                { userId: req.user._id },
                {
                    $inc: { balance: -amount }
                },
                {returnDocument: "after"}
            );
        }



        const expenses = await Expenses.create({
            userId: req.user._id,
            date,
            amount,
            category,
            expensesFrom,
            note
        })
        return res.status(200).json({ message: "expenses added successfully" })

    } catch (error) {
        return res.status(500).json({ message: "error in create expenses" })
    }
}





const createIncome = async (req, res) => {
    try {
        const { date, amount, category, gainFrom, note } = req.body

        let balance = await Balance.findOne({ userId: req.user._id })

        if (balance === null) {
            const currentBalance = await Balance.create({ userId: req.user._id, balance: amount })
        } else {
            await Balance.findOneAndUpdate(
                { userId: req.user._id },
                {
                    $inc: { balance: amount }
                },
                {returnDocument: "after"}
            );
        }

        // await Balance.findByIdAndUpdate({userId:req.user._id},
        //         {
        //             $inc: { balance: amount }
        //         },
        //         { new: true }
        // )


        const income = await Income.create({
            userId: req.user._id,
            date,
            amount,
            category,
            gainFrom,
            note
        })

        return res.status(200).json({ message: "income added successfully" })

    } catch (error) {
        return res.status(500).json({ message: "error in create expenses" })
    }
}



const getIncomeTransaction = async (req, res) => {
    try {
        const { startingDate, endingDate, gainFrom } = req.body

        const total = await Income.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    date: {
                        $gte: startingDate,
                        $lt: endingDate
                    },
                    gainFrom: gainFrom
                }
            },

            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: {
                            $toDouble: "$amount"
                        }
                    }
                }
            }
        ])


        const totalIncome = total[0]?.totalAmount || 0;

        console.log(total);
        return res.status(200).json({ message: `total in ${gainFrom} is ${totalIncome}`, })

    } catch (error) {
        return res.status(500).json({ message: "error in get transaction", error })
    }
}



const getExpensesTransaction = async (req, res) => {
    try {
        const { startingDate, endingDate, expensesFrom } = req.body

        const total = await Expenses.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    date: {
                        $gte: startingDate,
                        $lt: endingDate
                    },
                    expensesFrom: expensesFrom
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: {
                            $toDouble: "$amount"
                        }
                    }
                }
            }
        ])

        // console.log(total)
        const totalExpenses = total[0]?.totalAmount || 0

        return res.status(200).json({ message: `total expenses from ${expensesFrom} is ${totalExpenses}`, })

    } catch (error) {
        return res.status(500).json({ message: "something wrong in getExpensesTransaction", error })
    }

}



const everydayTransaction = async (req,res) => {
    try {

        const { startingDate, endingDate } = req.body


        const incomeResult = await Income.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    date: {
                        $gte: startingDate,
                        $lte: endingDate
                    }
                }
            },
                {
                $group:{
                    _id : {
                        date : "$date",
                        gainFrom: "$gainFrom"
                    },
                    total:{
                        $sum :{
                            $toDouble : "$amount"
                        }
                    }
                    }
                },
                {
                    $sort : {
                        "_id.date": 1
                    }
                }
        ])

        const cashIncome = []
        const cardIncome = []
        const mobileBankingIncome = []


        incomeResult.forEach(item => {
            const data = {
                date: item._id.date,
                amount: item.total
            };
            if(item._id.gainFrom === "Cash" ){
                cashIncome.push(data)
            }
            else if(item._id.gainFrom === "Card"){
                cardIncome.push(data)
            }
            else if (item._id.gainFrom === "Mobile Banking") {
                mobileBankingIncome.push(data);
            }
        })



        
        const expensesResult = await Expenses.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    date: {
                        $gte: startingDate,
                        $lte: endingDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        date: "$date",
                        expensesFrom: "$expensesFrom"
                    },
                    total: {
                        $sum: {
                            $toDouble: "$amount"
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);

        const cashExpenses = [];
        const cardExpenses = [];
        const mobileBankingExpenses = [];

        expensesResult.forEach(item => {
            const data = {
                date: item._id.date,
                amount: item.total
            };

            if (item._id.expensesFrom === "Cash") {
                cashExpenses.push(data);
            } else if (item._id.expensesFrom === "Card") {
                cardExpenses.push(data);
            } else if (item._id.expensesFrom === "Mobile Banking") {
                mobileBankingExpenses.push(data);
            }
        });

            return res.json({
                    incomeCash: cashIncome,
                    incomeCard: cardIncome,
                    incomeMobileBanking: mobileBankingIncome,
                               
                    expensesCash: cashExpenses,
                    expensesCard: cardExpenses,
                    expensesMobileBanking: mobileBankingExpenses
                
            });


        
    } catch (error) {
        return res.status(500).json({message:"something wrong in everyday Transaction", error})
    }
}


const balance = async(req,res) => {
    try {
        const balance =await Balance.findOne({userId: req.user._id}).select('balance -_id')
        // console.log(balance)
        return res.status(200).json({message:"balance is working", balance})
        
    } catch (error) {
        return res.status(500).json({message:'error in balance', error})
    }
}




const updateTransaction = async (req, res) => {

}

export {balance, getIncomeTransaction, everydayTransaction, getExpensesTransaction, updateTransaction, createExpenses, createIncome }