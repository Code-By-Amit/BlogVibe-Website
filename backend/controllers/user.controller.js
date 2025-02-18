import USER from "../model/user.model.js";
import bcrypt from 'bcrypt'

import { uploadOnCloudinary } from "../services/cloudService.js";

export const handelGetUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await USER.findById(userId).select('username fullName profileImg')
        if (!user) {
            res.status(404).json({ success: false, message: "Can't Find Author" })
        }
        res.status(200).json({ success: true, message: "Author of Comment", data: user })
    } catch (error) {
        console.log("Error in handelGetAllUser Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleUpdateUser = async (req, res) => {
    try {
        const { fullName, username, bio, email, password, googleId } = req.body;
        const userId = req.user.userId

        let user

        if (googleId) {
            user = await USER.findOne({ googleId: googleId })
        }
        else if (password) {
            user = await USER.findById(userId)
        }

        if (password && !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid Password !, Profile Can't be Updated" })
        }

        let profileImg;
        if (req.file) {
            const res = await uploadOnCloudinary(req.file.path);
            profileImg = res.secure_url
        }

        // Prepare the update object
        const updateData = {};

        if (fullName) updateData.fullName = fullName;
        if (username) updateData.username = username;
        if (bio) updateData.bio = bio;
        if (profileImg) updateData.profileImg = profileImg;
        if (email) updateData.email = email;


        const updatedUser = await USER.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select('-password');
        console.log(updatedUser)
        res.status(200).json({ success: true, message: "User Updated Sucessfully", data: updatedUser })

    } catch (error) {
        console.log("Error in handleUpdateUser Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}

export const handleChangePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await USER.findById('676d2cc3e34932ff775e6280');

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Both Field Required⚠️" })
        }

        if (!(await user.comparePassword(currentPassword))) {
            return res.status(400).json({ success: false, message: "Invalid Current Password⚠️" })
        }

        user.password = newPassword
        user.save()

        res.status(200).json({ success: true, message: "Password Updated Sucessfully" })
    } catch (error) {
        console.log("Error in handleChangePassword Conroller: ", error.message)
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
}
