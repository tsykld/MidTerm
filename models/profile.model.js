import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: String,
        default: null,
    },
    placeOfBirth: {
        type: String,
        default: null,       
    },
    nation: {
        type: String,
        default: null,     
    },
    academicLevel: {
        type: String,
        default: null,
        
    },
    skill: {
        type: String,
        default: null,
        
    },
    personalProject: [{
        projectName: {
            type: String,
            default: null
            
        },
        description: {
            type: String,
            default: null
            
        },
        role: {
            type: String,
            default: null
            
        },
        startDate: {
            type: String,
            default: null
            
        },
        endDate: {
            type: String,
            default: null
            
        },
    }],
    workingProcess: [{
        companyName: {
            type: String,
            default: null
            
        },
        role: {
            type: String,
            default: null
            
        },
        startDate: {
            type: String,
            default: null
            
        },
        endDate: {
            type: String,
            default: null
        }
    }],
    hobby: {
        type: String,
        default: null
    },
    personalGoal: {
        type: String,
        default: null
    }
});

const ProfileModel = mongoose.model("profiles", profileSchema);

export default ProfileModel