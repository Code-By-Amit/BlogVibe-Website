import mongoose from "mongoose";

export function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => { console.log("MongoDB Connected Sucessfully") })
        .catch(() => { console.log("Failed to Connect MongoDB") })
}