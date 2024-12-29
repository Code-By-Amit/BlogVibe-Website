import { verifyToken } from "../services/authService.js"

export async function isAuthenticated(req, res, next) {
    try {
        const token = req.cookies?.jwt
       
        if (!token) {
          return  res.status(200).json({ sucess: false, message: "Unauthorized" })
        }

        const decoded = await verifyToken(token)
        
        if (!decoded) {
          return  res.status(400).json({ sucess: false, message: "Invalid Token" })
        }
        
        req.user = decoded
        next();
    } catch (error) {
        console.log('Error in authentication Middleware: ', error)
    }
}

 