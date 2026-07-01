// backend : HTTPS, express, mongoose, bcrypt, jsonwebtoken, cors, dotenv, cookie-parser, multer, express-rate-limit, nodemailer, cloudinary



import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
import cors from 'cors'
const app = express()
const port = process.env.PORT
import cookieParser from 'cookie-parser'
import authRoute from './route/user.route.js'
import transactionRoute from './route/transaction.route.js'

app.use(cors({
  origin:process.env.CORS,
  credentials:true
})) 



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(cookieParser());
app.use(express.json())



app.use('/auth', authRoute)
app.use('/transaction', transactionRoute)



connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

