import VerifyCode from "../models/code.model.js";
import ProfileModel from "../models/profile.model.js";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';



const ProfileController = {
    loginProfile: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email) throw new Error('Email is required.');
            if (!password) throw new Error('Password is required.');

            const checkUser = await UserModel.findOne({ email });
            if (!checkUser) {
                res.status(400).send({
                    message: 'Email or password is incorrect.'
                })
            } 

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                res.status(400).send({
                    message: 'Email or password is incorrect.'
                })
            } 

            const authCode = Math.floor(100000 + Math.random() * 900000).toString();

            await VerifyCode.deleteMany({ email });

            const newCode = new VerifyCode({ email, code: authCode });
            await newCode.save()

            res.status(200).send({
                message: 'Login successfully!',
                verifyCode: authCode
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) throw new Error('Email is required.');

            const updateData = {
                ...req.body,

                personalProject: [{
                    projectName: req.body.projectName,
                    description: req.body.description,
                    role: req.body.role,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                }],

                workingProcess: [{
                    companyName: req.body.companyName,
                    role: req.body.role,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                }]
            };

            const updatedProfile = await ProfileModel.findOneAndUpdate(
                { email },
                req.body,
                { new: true, runValidators: true }
            )

            if (!updatedProfile) {
                res.status(404).json({ message: 'Profile not found.'})
            }

            res.status(200).send(updatedProfile)

        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    },
    logoutProfile: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) throw new Error('Email is required.')

            await VerifyCode.deleteMany({ email });

            res.status(200).json({ message: 'Logged out successfully!' });

        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}


export default ProfileController