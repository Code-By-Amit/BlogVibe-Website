import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },

}, { timestamps: true });

const COMMENT = mongoose.model('Comment', commentSchema)

export default COMMENT;