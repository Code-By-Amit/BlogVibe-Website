import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

import passport from './config/passport.js'
import authRoute from './routes/auth.routes.js'
import blogRoute from './routes/blog.routes.js'
import userRoute from './routes/user.routes.js'

import { connectToDB } from './config/connectToDB.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(passport.initialize())

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

 
app.use('/auth', authRoute)
app.use('/blog', blogRoute)
app.use('/user',userRoute)
app.get('/', async (req, res) => {
    res.status(200).json({ sucess: true, message: "Server is Running" })
})


app.listen(PORT, () => {
    connectToDB()
    console.log('Server Started on http://localhost:' + PORT)
}) 