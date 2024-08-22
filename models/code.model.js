import mongoose from "mongoose";


const verifyCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '15m'
    }
}) 

const VerifyCode = mongoose.model('codes', verifyCodeSchema);

export default VerifyCode