import express from "express";
import{getIncomeTransaction, getExpensesTransaction, updateTransaction, createIncome, createExpenses} from '../controller/transactionController.js'
import isjwtVerify from '../middleware/isJWTvalid.js'
import jwtVerify from "../middleware/jwtVerify.js";

const route = express.Router()


// route.post('/create', jwtVerify, createTransaction)
route.post('/income', jwtVerify, createIncome)
route.post('/expenses', jwtVerify, createExpenses)
route.post('/getIncomeTransaction', jwtVerify, getIncomeTransaction)
route.post('/getExpensesTransaction', jwtVerify, getExpensesTransaction)
route.put('/update', isjwtVerify, updateTransaction)



export default route