import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    blogImg: {
        type: String,
        default:""
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    tags: [{
        type: String
    }],
    reads:{
        type:Number,
        default:0
    }

}, { timestamps: true });

const BLOG = mongoose.model('Blog', blogSchema)

export default BLOG;    