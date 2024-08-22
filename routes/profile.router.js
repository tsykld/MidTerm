import { Router } from "express";
import ProfileController from "../controllers/profile.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";



const ProfileRouter = Router();

ProfileRouter.post('/login',ProfileController.loginProfile);
ProfileRouter.post('/verifyCode', AuthMiddleware.getProfile);
ProfileRouter.put('', ProfileController.updateProfile);
ProfileRouter.post('/logout', ProfileController.logoutProfile)

export default ProfileRouter