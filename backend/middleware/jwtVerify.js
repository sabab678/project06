import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import {User} from '../model/user.model.js'



const jwtVerify = async (req, res, next) => {

    const token = req.cookies?.jwt

    if (!token) {
        return res.status(401).json({message:"Authentication token missing"})
        console.log("missing")
    }
    // console.log(token)
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id).select('-password')

        if (!req.user) {
            return res.status(401).json({message:"User not found"})
        }
        // console.log(verify)
        // console.log(decode)

        next()
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"})
    }

}

export default jwtVerify
