import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs'
import 'dotenv/config'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadOnCloudinary(inputPathOrUrl) {
    try {
        if (!inputPathOrUrl) return null;
        const response = await cloudinary.uploader.upload(inputPathOrUrl, { resource_type: 'auto', allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"] })
        return response
    } catch (error) {
        console.error("Error uploading to Cloudinary: ", error);
        return null
    } finally {
        if (!/^https?:\/\//.test(inputPathOrUrl)) {
            try {
                fs.unlinkSync(inputPathOrUrl);
            } catch (unlinkError) {
                console.error("Error deleting local file: ", unlinkError);
            }
        }
    }
}