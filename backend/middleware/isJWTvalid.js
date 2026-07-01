// import jwt from 'jsonwebtoken'


// function isjwtVerify(req, res, next) {
//   // Token usually comes from cookie or Authorization header
//   const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     // No token at all -> treat as not logged in, continue to login handler
//     return next();
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         // Expired -> let them hit login normally
//         return next();
//       }
//       // Invalid/tampered token -> also send to login
//       return next();
//     }

//     // Valid and not expired -> attach user info and redirect to profile
//     req.user = decoded;
//     return res.redirect('/profile'); 
//     // or res.status(200).json({ redirect: '/profile', user: decoded }) if it's an API
//   });
// }

// function login(req, res) {
//   // Normal login logic — only reached if no valid token was found
//   // e.g. check email/password, then issue a new JWT
//   res.send('Show login page or handle login POST here');
// }


// export default isjwtVerify



























import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js'

const jwtVerify = async (req, res, next) => {

    const token = req.cookies?.jwt

    if (!token) {
        // No token -> not logged in, continue to login route
        return next()
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        // const verify = await User.findById(decode.id).select('verified')

        // if(!verify.verified){
        //     return res.status(401).json({message:"User not verified"})
        // }

        const user = await User.findById(decode.id).select('-password')


        if (!user) {
            // Token valid but user no longer exists -> treat as not logged in
            return next()
        }

        if(!user.verified){
            return res.status(401).json({message:"User not verified"})
        }

        req.user = user

        // Valid token + valid user -> already logged in, skip login logic
        return res.status(200).json({
            message: "Already logged in",
            redirect: "/profile",
            user: req.user
        })

    } catch (error) {
        // Covers both TokenExpiredError and JsonWebTokenError (invalid/tampered)
        return next()
    }
}

export default jwtVerify