import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto"

const saltRounds = 10;

const UserController = {
    checkUser: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) throw new Error('Email is required.');

            const checkUser = await UserModel.findOne({ email });
            if (!checkUser) {
                return res.status(400).send({
                    message: "User is not exist."
                })
            }
            
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },
    createNewUser: async (req, res) => {
        try {

            const { email, password } = req.body;

            if (!password) throw new Error('Password is required.')

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const createUser = await UserModel.create({
                email, 
                password: hashedPassword
            })

            res.status(200).send({
                message: "Create profile successfully!",
                data: createUser
            })
 
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

}


export default UserController