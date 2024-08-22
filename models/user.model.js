import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel