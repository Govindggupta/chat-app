import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "/avatar-placeholder.png",
    },
    bio:{
        type: String,
        default: "Hey there! I'm using Convo",
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
