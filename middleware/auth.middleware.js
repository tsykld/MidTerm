import VerifyCode from "../models/code.model.js";
import ProfileModel from "../models/profile.model.js";
import UserModel from "../models/user.model.js";



const AuthMiddleware = {
    getProfile: async (req, res, next) => {
        try {
            const { email, authCode } = req.body;
            if (!email || !authCode) throw new Error('Email and code are required.');

            const verifyCode = await VerifyCode.findOne({ email, code: authCode })
            
            if (!verifyCode) {
                return res.status(400).json({ message: 'Invalid or expired code.'})
            }

            const user = await ProfileModel.create({ email })

            const profile = await ProfileModel.findOne({ email })

            if (!profile) {
                res.status(404).send('User not found.');
            }

            res.status(200).send({
                message: 'Succeed',
                data: profile
            })

            return next()

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}

export default AuthMiddleware