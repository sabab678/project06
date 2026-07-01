import { User } from '../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
// import sendEmail from '../../utils/sendEmail.js'
import sendEmail from '../utils/sendEmail.js'
import cookieParser from 'cookie-parser'





const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}


const register = async (req,res) => {
    try {
        const {userName, email, password} =req.body

        if(!userName || !email || !password){
            res.status(400).json({message:"all fild required"})
        }

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                message:'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const otp = Math.floor(100000 + Math.random() * 900000)

        const message = `Your OTP is ${otp}`
        
        sendEmail(email, "OTP Verification", message)

        const user = await User.create({
            userName,
            email,
            password:hashedPassword,
            otp:otp
        })

        const options={
            httpOnly:true,
            secure:true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }

        return res.status(200)
        .cookie('jwt',generateToken(user._id), options)
        .json({message:"now add otp"})

    } catch (error) {
        res.status(500).json({message:"register",error})
    }
}





const otp = async (req,res) => {
    try {
        const {otp} = req.body
        // const token = req.cookies.jwt
        
        let user = req.user
        // console.log(otp)
        // console.log(user)
        
        const verifyOTP = user.otp.toString() === otp.toString()

        if(!verifyOTP){
            return res.status(400).json({message:"otp is not correct"})
        }

        user.verified = true
        user.otp = undefined;

        await user.save()

         
        res.status(200).json({message:"Email verification"})

    } catch (error) {
        res.status(500).json({message:"otp",error})
    }
}


const notGivenOTP = async(req,res) => {

    const user = req.user
    await User.deleteOne(user._id)

    return res.status(200)
    .clearCookie('jwt',options)
    .json({message:"your otp time is over"})
}



const login = async (req,res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message:"all fild required for login"})
        }

        // const userMiddleware = req.user

        // if (!userMiddleware.verified){
        //     res.status(400).json({message:"You have to verify first"})
        // }

        const user = await User.findOne({email})

        if(!user){
            return res.status(500).json({message:"user is not exists"})
        }
        

        const passVerification = await bcrypt.compare(password, user.password)

        if (!passVerification) {
            console.log("invalid password")
            return res.status(400).json({message:"invalid password"})
        }

        const options={
            httpOnly:true,
            secure:true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }        
        

        res.status(200)
        .cookie('jwt',generateToken(user._id), options)
        .json({message:"login successfull"})

    } catch (error) {
        res.status(500).json({message:"login",error})
    }
}


const logOut = async(req,res) =>{
    try {

        const options={
            httpOnly:true,
            secure:true            
        }

        res.status(200)
        .clearCookie('jwt',options)
        .json({message: "log out is successfull"})
        
    } catch (error) {
        res.status(500).json({message:"logOut",error})
    }
}


const profile = async(req, res) => {
    try {
        console.log("profile")


    } catch (error) {
        return res.status(500).json({message:"error in profile"})
    }
}



export {register, otp, login, notGivenOTP, logOut, profile}