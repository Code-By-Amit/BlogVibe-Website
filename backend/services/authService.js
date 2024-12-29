import jwt from 'jsonwebtoken'

export async function generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

export async function verifyToken(token) {
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return
    }
}