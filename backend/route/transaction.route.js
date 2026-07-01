import express from "express";
import{getTransaction, createTransaction, updateTransaction} from '../controller/transactionController.js'
import isjwtVerify from '../middleware/isJWTvalid.js'
import jwtVerify from "../middleware/isJWTvalid.js";

const route = express.Router()


route.post('/create', isjwtVerify, createTransaction)
route.get('/get', isjwtVerify, getTransaction)
route.put('/update', isjwtVerify, updateTransaction)



export default route