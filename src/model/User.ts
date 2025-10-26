import mongoose from 'mongoose';
import user_statuses from '../config/userStatuses';
import user_roles from "../config/userRoles";

const userSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: user_statuses,
        default: user_statuses.NOT_ACTIVE,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: user_roles,
        default: user_roles.USER
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);