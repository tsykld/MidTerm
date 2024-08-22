import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserMiddleware from "../middleware/user.middleware.js";

const UserRouter = Router();

UserRouter.post('', UserController.checkUser)                                                        // kiem tra co ton tai profile chua
UserRouter.post('/register', UserMiddleware.createNewUser, UserController.createNewUser)            // tao profile moi
                                               

export default UserRouter