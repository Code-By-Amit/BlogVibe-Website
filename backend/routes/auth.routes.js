import { Router } from "express";
import { handleUserLogin, handleUserSignup, handleUserLogout, handleGoogleLogin } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import passport from "passport";
import USER from "../model/user.model.js";
const router = Router()

router.post('/login', handleUserLogin)
router.post('/signup', handleUserSignup)
router.post('/logout', handleUserLogout)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { session: false }), handleGoogleLogin);

router.get('/verifytoken', isAuthenticated, async (req, res) => {
    const user = await USER.findById(req.user.userId).select('-password')
    if (!user) return res.status(400).json({ success: false })
    res.status(200).json({ user })
})

export default router