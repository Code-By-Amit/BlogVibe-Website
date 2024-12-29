import { updateUserData } from "../../client/src/api/api.js";
import USER from "../model/user.model.js";
import { generateToken } from "../services/authService.js";
import bcrypt from 'bcrypt'
import { uploadOnCloudinary } from "../services/cloudService.js";

export const handleUserLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Both username and password are required. ⚠️" })
        }

        const user = await USER.findOne({ username })
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with that email/username.😔" })
        }

        if (!(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials ⚠️" })
        }

        const payload = {
            userId: user._id
        }

        const token = await generateToken(payload)

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
            maxage: 7 * 24 * 60 * 70 * 1000
        })

        res.status(200).json({
            success: true, message: `Welcome back! ${user.fullName} 🎉`,
            user: {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImg: user.profileImg,
                blogs: user.blogs,
                createdAt: user.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}

export const handleUserSignup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword } = req.body;

        let user = await USER.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (user) {
            if (user.username === username) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists",
                });
            }
            else if (user.email === email) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }


        user = await USER.create({
            fullName,
            username,
            email,
            password
        })
        const payload = {
            userId: user._id,
        }

        const token = await generateToken(payload);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxage: 7 * 24 * 60 * 60 * 1000,               // 7 Days
            sameSite: 'strict',                            // Prevent CSRF
        })

        res.status(201).json({
            success: true, message: "Signed in successfully! Let's get started. 🌟", user: {
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImg: user.profileImg,
                blogs: user.blogs,
                createdAt: user.createdAt
            }
        })

    } catch (error) {
        console.log("Error in sign up handeler : ", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}

export const handleUserLogout = (req, res) => {
    try {
        const token = req.cookies.jwt
        if (token) {
            res.clearCookie('jwt')
        }
        res.status(200).json({ success: true, message: "Successfully Sign out. See you soon! 👋" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}

export const handleGoogleLogin = async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userProfile = req.user;
        let user = await USER.findOne({ 'googleId': userProfile.id });
        const email = userProfile.emails[0].value

        if (!user) {
            let username = userProfile.displayName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
            const uniqueUserName = `${username}_${Math.floor(Math.random() * 50000)}`

            const res = await uploadOnCloudinary(userProfile.photos[0].value)
            const imageUrl = res.secure_url;

            user = await USER.create({
                fullName: userProfile.displayName,
                username: uniqueUserName,
                email,
                name: userProfile.name.givenName,
                googleId: userProfile.id,
                profileImg: imageUrl
            })
        }

        const token = await generateToken({ userId: user.id, email: email })

        // Set the JWT as a secure cookie
        res.cookie('jwt', token, {
            httpOnly: true,                                     // Prevents access by client-side JavaScript
            secure: process.env.NODE_ENV === 'production',      // Use secure cookies in production
            sameSite: 'strict',                                 // Prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000,                                       // Cookie expires in 7 days
        });

        // Redirect to the frontend without exposing the token
        res.redirect(process.env.FRONTEND_URL)
    } catch (error) {
        console.log("Error in Authentication callback: ", error);
        res.status(500).json({ success:false, message:"Internal Server Error", error:error.message });
    }
}