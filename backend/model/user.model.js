import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    googleId:{
        type:String
    },
    fullName:{
        type:String,
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },
    profileImg: {
        type: String,
        default: "https://res.cloudinary.com/dqelb5apq/image/upload/v1735110671/default_jpdc4o.jpg"
    },
    blogs: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
    }],
    comments:[
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ]
},
    { timestamps: true }
)

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password)
}

const USER = mongoose.model('User', userSchema)

export default USER