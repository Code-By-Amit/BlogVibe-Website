import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import 'dotenv/config'

const obj = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
}

passport.use(
    new GoogleStrategy(obj, async (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }))

export default passport