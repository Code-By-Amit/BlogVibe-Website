import { Router } from "express";
import { handelGetUserById, handleChangePassword, handleUpdateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = Router();

router.get('/:userId',isAuthenticated ,handelGetUserById)
router.patch('/update', upload.single('profileImg'), isAuthenticated, handleUpdateUser)
router.patch('/updatepassword',isAuthenticated, handleChangePassword)

export default router;  