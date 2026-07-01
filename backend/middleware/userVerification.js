import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import {User} from '../model/user.model.js'

const userVerification = async (req, res)=> {
    const token = req.cookies.jwt
    
}

export default userVerification